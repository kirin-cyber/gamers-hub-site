import Image from "next/image";
import ContactForm from "./ContactForm";
import MotionController from "./MotionController";

const companyRows = [
  ["会社名", "株式会社GAMER’S HUB"],
  ["代表取締役", "川瀬 楓馬"],
  ["設立", "2026年5月25日"],
  ["資本金", "200万円"],
  ["所在地", "福岡県福岡市中央区大名二丁目10番20号\nMKTOWNS大名 2階"],
  ["事業内容", "メディアの企画・運営支援\nAIコンサルティング・生成AI導入支援\nWeb・業務システムの企画・開発・運用\n飲食店の運営"],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.gamershub.jp/#organization",
      name: "株式会社GAMER’S HUB",
      alternateName: "GAMERS HUB",
      url: "https://www.gamershub.jp/",
      logo: "https://www.gamershub.jp/images/gamershub-logo.jpg",
      description: "福岡を拠点に、メディア運営支援、AIコンサルティング、生成AI導入、Web・業務システム開発を行う会社です。",
      address: {
        "@type": "PostalAddress",
        addressRegion: "福岡県",
        addressLocality: "福岡市中央区",
        streetAddress: "大名二丁目10番20号 MKTOWNS大名2階",
        addressCountry: "JP",
      },
      knowsAbout: ["メディア運営支援", "AIコンサルティング", "生成AI導入", "Webシステム開発", "業務システム開発", "飲食店DX"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gamershub.jp/#website",
      url: "https://www.gamershub.jp/",
      name: "GAMERS HUB",
      alternateName: "株式会社GAMER’S HUB",
      inLanguage: "ja-JP",
      publisher: { "@id": "https://www.gamershub.jp/#organization" },
    },
    {
      "@type": "Restaurant",
      "@id": "https://izakaya-sixamo.com/#restaurant",
      name: "炉端居酒屋 獅軍鶏",
      alternateName: "sixamo",
      url: "https://izakaya-sixamo.com/",
      image: "https://www.gamershub.jp/images/sixamo-sign.jpg",
      parentOrganization: { "@id": "https://www.gamershub.jp/#organization" },
      address: {
        "@type": "PostalAddress",
        postalCode: "810-0073",
        addressRegion: "福岡県",
        addressLocality: "福岡市中央区",
        streetAddress: "舞鶴1-8-30 プリズモ21 1F",
        addressCountry: "JP",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "17:00",
        closes: "01:00",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MotionController />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="GAMERS HUB トップへ">
          <Image src="/images/gamershub-logo.jpg" alt="" width={42} height={42} priority unoptimized />
          <span>GAMERS HUB</span>
        </a>

        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#business">Business</a>
          <a href="#restaurant">Restaurant</a>
          <a href="#company">Company</a>
          <a href="#contact">Contact</a>
        </nav>

        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="#business">Business</a>
            <a href="#restaurant">Restaurant</a>
            <a href="#company">Company</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-stage" aria-hidden="true"><i /><i /><i /></div>
          <div className="hero-inner">
            <div className="hero-meta">
              <span>DEVELOPMENT COMPANY / FUKUOKA</span>
              <span>EST. 2026</span>
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
              <span className="scroll-cue"><i />SCROLL</span>
            </div>
          </div>
        </section>

        <div className="kinetic-ticker" aria-hidden="true">
          <div className="kinetic-track" data-kinetic="0.18">
            {[0, 1].map((group) => (
              <p key={group}><b>AI DEVELOPMENT</b><i />WEB &amp; SYSTEM<i />RESTAURANT OPERATION<i />GH ONE<i /></p>
            ))}
          </div>
        </div>

        <section className="manifesto">
          <div className="shell manifesto-grid">
            <span className="section-label">Our Approach</span>
            <h2 data-reveal="up"><em>AIで</em>業務を効率化<br />最適化を構築します。</h2>
            <p data-reveal="up">
              メディア運営支援、AIコンサルティング、Web・業務システムの開発、運用改善まで。<br />
              事業に合わせた仕組みを構築します。
            </p>
          </div>
        </section>

        <section id="business" className="business">
          <div className="shell section-title" data-reveal="up">
            <span className="section-label">Our Business</span>
            <h2>事業内容</h2>
          </div>

          <article className="business-panel panel-ai">
            <div className="shell panel-grid">
              <div className="panel-heading" data-reveal="left">
                <div className="panel-meta"><b>01</b><span>CORE BUSINESS</span></div>
                <h3>AI<br />DEVELOPMENT</h3>
              </div>
              <div className="panel-visual ai-visual js-tilt" data-reveal="up" data-parallax="0.035" aria-label="AIシステムの稼働イメージ">
                <div className="visual-head"><span>GH / DEVELOPMENT PROCESS</span><b>ACTIVE</b></div>
                <div className="ai-process">
                  <div><span>01</span><strong>UNDERSTAND</strong><small>現場を知る</small></div>
                  <div><span>02</span><strong>DESIGN</strong><small>業務を設計する</small></div>
                  <div><span>03</span><strong>BUILD</strong><small>AIを実装する</small></div>
                  <div><span>04</span><strong>IMPROVE</strong><small>運用から改善する</small></div>
                </div>
                <div className="ai-result"><span>FIELD INPUT</span><i>→</i><b>WORKING SYSTEM</b></div>
              </div>
              <div className="panel-copy" data-reveal="up">
                <h4>AIコンサルティング・生成AI開発</h4>
                <p>業務に合わせたAI導入、独自ツール、業務設計と自動化。構想から運用まで一貫して支援・開発します。</p>
              </div>
            </div>
          </article>

          <article className="business-panel panel-web">
            <div className="shell panel-grid reverse">
              <div className="panel-heading" data-reveal="left">
                <div className="panel-meta"><b>02</b><span>DESIGN &amp; ENGINEERING</span></div>
                <h3>WEB /<br />SYSTEM</h3>
              </div>
              <div className="panel-visual web-visual js-tilt" data-reveal="up" data-parallax="0.035" aria-label="Web・業務システムの画面イメージ">
                <div className="browser-bar"><i /><i /><i /><span>gamershub.jp / system</span></div>
                <div className="system-ui">
                  <aside><b>GH</b><i /><i /><i /><i /></aside>
                  <div className="ui-main">
                    <small>OPERATION OVERVIEW</small>
                    <strong>84.6<span>%</span></strong>
                    <div className="ui-chart"><i /><i /><i /><i /><i /><i /><i /></div>
                    <div className="ui-cards"><span>WEB</span><span>DATA</span><span>OPS</span></div>
                  </div>
                </div>
              </div>
              <div className="panel-copy" data-reveal="up">
                <h4>Web・業務システム開発</h4>
                <p>Webメディアの企画・運営支援、コーポレートサイト、Webアプリ、管理画面。事業に必要な体験と仕組みを設計・実装します。</p>
              </div>
            </div>
          </article>

          <article id="restaurant" className="business-panel panel-restaurant">
            <div className="shell panel-grid">
              <div className="panel-heading" data-reveal="left">
                <div className="panel-meta"><b>03</b><span>RESTAURANT DX / OWNED STORE</span></div>
                <h3>RESTAURANT<br />DX.</h3>
              </div>
              <div className="panel-visual restaurant-visual" data-reveal="up" data-parallax="0.04">
                <Image src="/images/sixamo-sign.jpg" alt="提灯が灯る炉端居酒屋 獅軍鶏の店内" fill sizes="(max-width: 760px) 90vw, 52vw" unoptimized />
                <div className="restaurant-stamp"><small>FUKUOKA / MAIZURU</small><b>炉端居酒屋<br />獅軍鶏</b></div>
              </div>
              <div className="panel-copy" data-reveal="up">
                <h4 className="restaurant-dx-title"><span>自社店舗で磨く、</span>飲食店DX支援。</h4>
                <p>福岡・舞鶴で「炉端居酒屋 獅軍鶏」を運営し、AIと自社開発の経営管理システムを導入。店舗運営データを一元化し、実店舗で得た知見を飲食店のDX支援に活かしています。</p>
                <div className="restaurant-brief" aria-label="炉端居酒屋 獅軍鶏の店舗情報">
                  <span><small>OWNED RESTAURANT</small>炉端居酒屋 獅軍鶏</span>
                  <span><small>HOURS</small>17:00 — 翌1:00 / 月曜定休</span>
                  <span><small>ADDRESS</small>福岡市中央区舞鶴1-8-30</span>
                </div>
                <a className="pill-link js-magnetic" href="https://izakaya-sixamo.com/" target="_blank" rel="noreferrer">店舗サイトを見る <b>→</b></a>
              </div>
            </div>
          </article>
        </section>

        <section id="gh-one" className="store-os gh-one-teaser">
          <div className="shell store-os-grid">
            <div data-reveal="left">
              <span className="section-label">New Product</span>
              <h2>GH ONE</h2>
              <small className="gh-one-reading">ジーエイチ・ワン / Developed by GAMERS HUB</small>
            </div>
            <div className="store-os-copy" data-reveal="up">
              <p><strong>COMING SOON.</strong><br />新しいプロダクトを開発中です。<br />詳細は近日公開します。</p>
              <a className="gh-one-coming-link" href="/gh-one/"><span>PRODUCT 01</span>COMING SOON <b>→</b></a>
            </div>
          </div>
        </section>

        <section id="company" className="company">
          <div className="shell section-title" data-reveal="up">
            <span className="section-label">Who We Are</span>
            <h2>会社情報</h2>
          </div>
          <div className="shell company-grid">
            <div className="company-message" data-reveal="left">
              <small>株式会社GAMER’S HUB</small>
              <p>開発と運営を、<br /><em>ひとつの会社で。</em></p>
            </div>
            <dl data-reveal="up">
              {companyRows.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value.split("\n").map((line) => <span key={line}>{line}</span>)}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="shell contact-grid">
            <div className="contact-heading">
              <span className="section-label">Contact</span>
              <h2 data-reveal="up">LET&apos;S<br />TALK.</h2>
              <p data-reveal="up">メディア運営支援、AIコンサルティング、システム開発、飲食店DXについて、お気軽にご相談ください。</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-grid">
          <div><b><i>GAMERS</i> HUB</b><p>MEDIA OPERATIONS × AI CONSULTING × WEB / SYSTEM DEVELOPMENT</p></div>
          <nav><a href="#business">Business</a><a href="#restaurant">Restaurant</a><a href="#company">Company</a><a href="#contact">Contact</a></nav>
          <span>© 2026 GAMERS HUB INC.</span>
        </div>
      </footer>
    </>
  );
}
