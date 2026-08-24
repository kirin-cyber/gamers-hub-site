"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MotionElement = HTMLElement & {
  dataset: DOMStringMap & { parallax?: string };
};

export default function MotionController() {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const compactViewport = window.innerWidth <= 760;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const parallaxItems = Array.from(document.querySelectorAll<MotionElement>("[data-parallax]"));
    const kineticItems = Array.from(document.querySelectorAll<HTMLElement>("[data-kinetic]"));
    const businessPanels = Array.from(document.querySelectorAll<HTMLElement>(".business-panel"));
    const tiltItems = Array.from(document.querySelectorAll<HTMLElement>(".js-tilt"));
    const magneticItems = Array.from(document.querySelectorAll<HTMLElement>(".js-magnetic"));
    const menuLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".mobile-menu nav a"));
    let ticking = false;

    root.classList.add("has-motion");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-inview");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    reveals.forEach((element) => revealObserver.observe(element));

    const updateScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      root.style.setProperty("--scroll-progress", progress.toString());
      root.style.setProperty(
        "--hero-progress",
        compactViewport ? "0" : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1).toFixed(4),
      );
      document.body.classList.toggle("is-scrolled", window.scrollY > 42);

      if (!compactViewport) {
        kineticItems.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const speed = Number(element.dataset.kinetic ?? "0.15");
          const offset = (window.innerHeight - rect.top) * speed * -1;
          element.style.setProperty("--kinetic-x", `${offset.toFixed(2)}px`);
        });

        businessPanels.forEach((panel) => {
          const rect = panel.getBoundingClientRect();
          const panelProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
          panel.style.setProperty("--panel-progress", panelProgress.toFixed(4));
          panel.style.setProperty("--panel-shift", `${((1 - panelProgress) * 46).toFixed(2)}px`);
          panel.style.setProperty("--panel-scale", (0.97 + panelProgress * 0.03).toFixed(4));
        });
      }

      if (!reduceMotion && window.innerWidth > 760) {
        parallaxItems.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < -300 || rect.top > window.innerHeight + 300) return;
          const speed = Number(element.dataset.parallax ?? "0.08");
          const centerOffset = window.innerHeight / 2 - (rect.top + rect.height / 2);
          const offset = Math.max(-100, Math.min(100, centerOffset * speed));
          element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
        });
      }

      ticking = false;
    };

    const requestScrollUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScroll);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--mouse-x", `${((event.clientX / window.innerWidth) * 100).toFixed(2)}%`);
      root.style.setProperty("--mouse-y", `${((event.clientY / window.innerHeight) * 100).toFixed(2)}%`);
      if (!finePointer) return;
      cursorDot.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      cursorRing.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
    };

    const tiltCleanups = tiltItems.map((element) => {
      const move = (event: PointerEvent) => {
        if (reduceMotion || !finePointer) return;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
        element.style.setProperty("--pointer-x", `${((x + 0.5) * 100).toFixed(2)}%`);
        element.style.setProperty("--pointer-y", `${((y + 0.5) * 100).toFixed(2)}%`);
      };
      const leave = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    const magneticCleanups = magneticItems.map((element) => {
      const move = (event: PointerEvent) => {
        if (reduceMotion || !finePointer) return;
        const rect = element.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        element.style.setProperty("--magnetic-x", `${(x * 0.16).toFixed(1)}px`);
        element.style.setProperty("--magnetic-y", `${(y * 0.16).toFixed(1)}px`);
      };
      const leave = () => {
        element.style.setProperty("--magnetic-x", "0px");
        element.style.setProperty("--magnetic-y", "0px");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    const handleMenuLinkClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");

      if (!compactViewport || !href?.startsWith("#")) {
        menu?.removeAttribute("open");
        return;
      }

      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) {
        menu?.removeAttribute("open");
        return;
      }

      event.preventDefault();
      menu?.removeAttribute("open");

      window.requestAnimationFrame(() => {
        const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 64;
        const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
        window.history.pushState(null, "", href);
      });
    };
    menuLinks.forEach((link) => link.addEventListener("click", handleMenuLinkClick));

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    updateScroll();

    const readyTimer = window.setTimeout(() => root.classList.add("motion-ready"), 80);
    const loaderTimer = window.setTimeout(
      () => setLoaderVisible(false),
      reduceMotion ? 250 : compactViewport ? 1350 : 2050,
    );

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(loaderTimer);
      revealObserver.disconnect();
      tiltCleanups.forEach((cleanup) => cleanup());
      magneticCleanups.forEach((cleanup) => cleanup());
      menuLinks.forEach((link) => link.removeEventListener("click", handleMenuLinkClick));
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      window.removeEventListener("pointermove", onPointerMove);
      root.classList.remove("has-motion", "motion-ready");
    };
  }, []);

  return (
    <>
      {loaderVisible && (
        <div className="site-loader" aria-hidden="true">
          <div className="loader-grid" />
          <div className="loader-logo">
            <Image src="/images/gamershub-logo.jpg" alt="" width={180} height={180} priority unoptimized />
          </div>
          <div className="loader-meta"><span>GAMERS HUB</span><span>BUILD / OPERATE / IMPROVE</span></div>
          <div className="loader-progress"><i /></div>
        </div>
      )}
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <div className="motion-noise" aria-hidden="true" />
      <div ref={cursorDot} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorRing} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
