"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("website") ?? "").trim()) return;

    const name = String(form.get("name") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const category = String(form.get("category") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = `[GAMERS HUB お問い合わせ] ${category} / ${name}`;
    const body = [
      `お名前：${name}`,
      `会社名：${company || "未入力"}`,
      `メールアドレス：${email}`,
      `ご相談内容：${category}`,
      "",
      message,
    ].join("\n");

    setStatus("メールアプリを開いています。内容を確認して送信してください。");
    window.location.href = `mailto:info@gamershub.jp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} data-reveal="up">
      <div className="contact-form-row">
        <label>
          <span>NAME <b>必須</b></span>
          <input name="name" type="text" autoComplete="name" placeholder="お名前" required />
        </label>
        <label>
          <span>COMPANY</span>
          <input name="company" type="text" autoComplete="organization" placeholder="会社名・店舗名" />
        </label>
      </div>

      <label>
        <span>EMAIL <b>必須</b></span>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>

      <label>
        <span>SUBJECT <b>必須</b></span>
        <select name="category" defaultValue="" required>
          <option value="" disabled>ご相談内容を選択してください</option>
          <option>AI・業務システム開発</option>
          <option>Webサイト・Webアプリ開発</option>
          <option>飲食店へのAI導入支援</option>
          <option>採用・協業について</option>
          <option>その他</option>
        </select>
      </label>

      <label>
        <span>MESSAGE <b>必須</b></span>
        <textarea name="message" rows={7} placeholder="ご相談内容をご記入ください" required />
      </label>

      <label className="contact-form-trap" aria-hidden="true">
        <span>WEBSITE</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="contact-consent">
        <input type="checkbox" required />
        <span>入力内容をお問い合わせ対応のために使用することに同意します。</span>
      </label>

      <div className="contact-submit-row">
        <button type="submit"><span>SEND MESSAGE</span><b>→</b></button>
        <small>送信ボタンを押すと、メールアプリが開きます。</small>
      </div>
      <p className="contact-form-status" aria-live="polite">{status}</p>
    </form>
  );
}
