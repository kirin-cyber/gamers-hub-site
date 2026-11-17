"use client";

import { useEffect, useRef, useState } from "react";
import "./particle-hero.css";

const COLORS = ["#f59a22", "#ffc46b", "#fff0d8"];

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLElement>(null);
  const elapsed = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !host || !ctx) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, frame = 0, last = 0, time = elapsed.current;
    let visible = true, disposed = false;
    let pointer = { x: 0, y: 0, strength: 0, target: 0 };
    let compact = false;
    // Seeded positions keep the static fallback and first frame consistent.
    const stars = Array.from({ length: 110 }, (_, i) => ({
      x: ((i * 7919) % 104729) / 104729,
      y: ((i * 3571 + 103) % 8191) / 8191,
      size: i % 7 === 0 ? 1.3 : .65,
    }));
    // Stable orbital elements. Kepler-style angular speed gives every particle
    // a repeatable path, with faster motion close to the central mass.
    const orbitals = Array.from({ length: 7200 }, (_, i) => {
      const seed = ((i * 7919 + 17) % 104729) / 104729;
      const radius = .34 + Math.pow(seed, 1.35) * .82;
      return { radius, angle: i * 2.3999632297, speed: .15 / Math.pow(radius, 1.5),
        brightness: .3 + .7 * (((i * 3571) % 8191) / 8191),
        lift: Math.sin(i * 12.9898) * .012 };
    });
    const running = () => !paused && !reduced && !motionQuery.matches && visible && !document.hidden;
    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, width, height);
      const scale = Math.min(width * (compact ? .9 : .44), height * .48);
      const cx = width * (compact ? .4 : .31);
      const cy = height * (compact ? .40 : .49);
      const horizon = scale * .205;
      const tilt = -.28;
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      const glow = ctx.createRadialGradient(cx, cy, horizon, cx, cy, scale * 1.35);
      glow.addColorStop(0, "#f59a2220");
      glow.addColorStop(.35, "#9c4d1010");
      glow.addColorStop(1, "#08080800");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      // Distant stars stay nearly still, making the ordered orbital motion clear.
      for (const star of stars) {
        ctx.globalAlpha = .15 + star.x * .4;
        ctx.fillStyle = star.size > 1 ? "#fff0d8" : "#c8c4ba";
        ctx.fillRect(star.x * width, star.y * height, star.size, star.size);
      }
      const project = (radius: number, angle: number, lift = 0) => {
        const px = Math.cos(angle) * radius * scale;
        const py = Math.sin(angle) * radius * scale * .38 + lift * scale;
        let x = cx + px * ct - py * st;
        let y = cy + px * st + py * ct;
        const dx = pointer.x - x, dy = pointer.y - y;
        const pull = Math.exp(-(dx * dx + dy * dy) / (scale * scale * .11)) * pointer.strength * .23;
        x += dx * pull; y += dy * pull;
        return [x, y];
      };
      ctx.globalCompositeOperation = "lighter";
      // Faint continuous orbital tracks anchor the brighter moving particles.
      for (let ring = 0; ring < (compact ? 38 : 65); ring++) {
        const radius = .34 + ring / (compact ? 37 : 64) * .84;
        ctx.strokeStyle = ring % 9 === 0 ? COLORS[1] : COLORS[0];
        ctx.lineWidth = ring % 9 === 0 ? .6 : .3;
        ctx.globalAlpha = .025 + .075 * (1 - (radius - .34) / .84);
        ctx.beginPath();
        for (let step = 0; step <= 160; step++) {
          const [x, y] = project(radius, step / 160 * Math.PI * 2);
          if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      const drawDisk = (front: boolean) => {
        const count = compact ? 2800 : orbitals.length;
        for (let i = 0; i < count; i++) {
          const p = orbitals[i];
          const angle = p.angle + time * p.speed;
          if ((Math.sin(angle) > 0) !== front) continue;
          const [x, y] = project(p.radius, angle, p.lift);
          const heat = 1 - (p.radius - .34) / .82;
          const beaming = .6 + .4 * (.5 + .5 * Math.cos(angle));
          ctx.globalAlpha = (.24 + heat * .76) * p.brightness * beaming;
          ctx.strokeStyle = COLORS[heat > .83 ? 2 : heat > .5 ? 1 : 0];
          ctx.fillStyle = ctx.strokeStyle;
          ctx.lineWidth = heat > .8 ? .8 : .5;
          const [tx, ty] = project(p.radius, angle - .038 * p.speed, p.lift);
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
          if (i % 4 === 0) ctx.fillRect(x, y, .7 + heat * .6, .7 + heat * .6);
        }
      };
      drawDisk(false);
      // Gravitational lensing-inspired arcs wrap the far disk around the shadow.
      for (let ring = 0; ring < (compact ? 28 : 52); ring++) {
        const r = horizon * (1.03 + ring * .012);
        ctx.globalAlpha = .035 + .16 * Math.pow(1 - ring / 52, 3);
        ctx.strokeStyle = ring < 5 ? COLORS[2] : COLORS[0];
        ctx.lineWidth = ring < 4 ? .8 : .4;
        ctx.beginPath();
        for (let step = 0; step <= 120; step++) {
          const a = step / 120 * Math.PI * 2;
          const lens = 1 + .035 * Math.cos(a * 2 + time * .045);
          const x = cx + Math.cos(a) * r * lens;
          const y = cy + Math.sin(a) * r;
          if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // The event horizon stays completely dark, in contrast to the hot disk.
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#030303";
      ctx.beginPath(); ctx.arc(cx, cy, horizon, 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = "lighter";
      const corona = ctx.createRadialGradient(cx, cy, horizon * .98, cx, cy, horizon * 1.17);
      corona.addColorStop(0, "#ffcc7500");
      corona.addColorStop(.12, "#ffe3a8a0");
      corona.addColorStop(.35, "#f59a2218");
      corona.addColorStop(1, "#f59a2200");
      ctx.fillStyle = corona;
      ctx.beginPath(); ctx.arc(cx, cy, horizon * 1.17, 0, Math.PI * 2); ctx.fill();
      drawDisk(true);
      // A handful of satellites make the shared center and different periods legible.
      for (let i = 0; i < 9; i++) {
        const radius = .58 + i * .073;
        const angle = i * 2.4 + time * .15 / Math.pow(radius, 1.5);
        const [x, y] = project(radius, angle);
        ctx.globalAlpha = .65;
        ctx.fillStyle = COLORS[i % 3];
        ctx.beginPath(); ctx.arc(x, y, i % 3 === 0 ? 1.6 : 1, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = .24;
        ctx.strokeStyle = COLORS[1]; ctx.lineWidth = .6; ctx.beginPath();
        for (let j = 0; j <= 18; j++) {
          const [sx, sy] = project(radius, angle - j * .008);
          if (j === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };
    const tick = (now: number) => {
      frame = 0;
      if (!running() || disposed) return;
      const interval = compact ? 1000 / 30 : 1000 / 60;
      if (now - last >= interval - 1) {
        const delta = Math.min((now - last) / 1000 || .016, .05);
        last = now;
        time += delta;
        elapsed.current = time;
        pointer.strength += (pointer.target - pointer.strength) * Math.min(1, delta * 5);
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = performance.now();
      if (running()) frame = requestAnimationFrame(tick);
      else draw();
    };
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width; height = rect.height;
      compact = width <= 760;
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (!running()) return;
      const rect = host.getBoundingClientRect();
      pointer = { ...pointer, x: event.clientX - rect.left, y: event.clientY - rect.top, target: 1 };
    };
    const leave = () => { pointer.target = 0; };
    const release = (event: PointerEvent) => { if (event.pointerType !== "mouse") leave(); };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(host);
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerdown", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerup", release);
    host.addEventListener("pointercancel", leave);
    document.addEventListener("visibilitychange", sync);
    motionQuery.addEventListener("change", sync);
    resize(); sync();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect(); intersection.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerup", release);
      host.removeEventListener("pointercancel", leave);
      document.removeEventListener("visibilitychange", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, [paused, reduced]);

  return (
    <section className="hero particle-hero" ref={hostRef} aria-labelledby="hero-title">
      <canvas className="particle-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="particle-shade" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-meta">
          <span>DEVELOPMENT COMPANY / FUKUOKA</span><span>EST. 2026</span>
        </div>
        <div className="hero-composition">
          <h1 id="hero-title">
            <span className="hero-word word-build"><b>BUILD.</b></span>
            <span className="hero-word word-operate"><b>OPERATE.</b></span>
            <span className="hero-word word-improve"><b>IMPROVE.</b></span>
          </h1>
        </div>
        <div className="hero-foot">
          <p className="hero-statement">AIの力で、<br />事業を動かす。</p>
          <p className="hero-service">MEDIA OPERATIONS<br />AI CONSULTING<br />WEB / SYSTEM DEVELOPMENT</p>
          <div className="particle-controls">
            <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused || reduced} disabled={reduced} aria-label={reduced ? "動きを抑える設定により静止表示" : paused ? "背景アニメーションを再生" : "背景アニメーションを一時停止"}>
              <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span> {reduced ? "静止表示" : paused ? "再生" : "一時停止"}
            </button>
            <a href="#business" className="particle-scroll">SCROLL <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
