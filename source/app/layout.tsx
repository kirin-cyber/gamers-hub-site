import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080808",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gamershub.jp"),
  title: {
    default: "GAMERS HUB | メディア運営支援・AIコンサルティング・開発",
    template: "%s | GAMERS HUB",
  },
  description:
    "福岡のGAMERS HUBは、メディア運営支援、AIコンサルティング、生成AI導入、Web・業務システムの企画・開発を行う会社です。飲食店を含む事業の業務設計・運用改善まで支援します。",
  applicationName: "GAMERS HUB",
  alternates: { canonical: "/" },
  openGraph: {
    title: "メディア運営支援・AIコンサルティング・開発 | GAMERS HUB",
    description: "メディア運営支援、AIコンサルティング、生成AI導入、Web・業務システム開発を行う福岡の開発会社です。",
    url: "https://www.gamershub.jp/",
    siteName: "GAMERS HUB",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-v3.png",
        width: 1731,
        height: 909,
        alt: "GAMERS HUB — AI・Web・システム開発と飲食店運営",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "メディア運営支援・AIコンサルティング・開発 | GAMERS HUB",
    description: "メディア運営支援、AIコンサルティング、生成AI導入、Web・業務システム開発を行う福岡の開発会社です。",
    images: ["/og-v3.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg?v=20260825" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg?v=20260825" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/gamershub-logo.jpg?v=20260825" />
      </head>
      <body>{children}</body>
    </html>
  );
}
