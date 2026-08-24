/* eslint-disable @next/next/no-html-link-for-pages -- static hosting uses full document navigation */

export default function GhOneComingSoon() {
  return (
    <main className="gh-product gh-coming">
      <header className="gh-product-nav">
        <a className="gh-product-brand" href="/"><span>GH</span> GAMERS HUB</a>
        <span className="gh-product-nav-category">NEW PRODUCT / GH ONE</span>
        <nav aria-label="GH ONEナビゲーション">
          <a href="/">Corporate</a>
          <a className="gh-nav-demo" href="/#contact">Contact →</a>
        </nav>
      </header>

      <section className="gh-coming-stage">
        <div className="gh-coming-meta"><span>NEW PRODUCT / 01</span><span>GAMERS HUB / FUKUOKA</span></div>
        <div className="gh-coming-title">
          <h1><span>GH</span> ONE</h1>
          <p>ジーエイチ・ワン</p>
        </div>
        <div className="gh-coming-message">
          <span>PRODUCT STATUS</span>
          <h2>COMING<br />SOON.</h2>
          <p>詳細は近日公開します。</p>
        </div>
        <div className="gh-coming-line" aria-hidden="true"><i /></div>
      </section>

      <footer className="gh-coming-footer">
        <a href="/">← GAMERS HUBへ戻る</a>
        <span>© 2026 GAMERS HUB INC.</span>
      </footer>
    </main>
  );
}
