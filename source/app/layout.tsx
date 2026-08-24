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
    default: "GAMERS HUB | 福岡のAI・システム開発・飲食店DX支援",
    template: "%s | GAMERS HUB",
  },
  description:
    "福岡の開発会社GAMERS HUB。AI・Web・業務システムの企画・開発から飲食店DX支援まで対応。自社運営の炉端居酒屋 獅軍鶏でAIと業務システムを実装・改善し、現場で得た知見を開発に活かしています。",
  applicationName: "GAMERS HUB",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AIの力で、事業を動かす。 | GAMERS HUB",
    description: "AI・Web・業務システム開発と飲食店DX支援を行う福岡の開発会社。自社運営の炉端居酒屋 獅軍鶏で技術を実装・改善しています。",
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
    title: "AIの力で、事業を動かす。 | GAMERS HUB",
    description: "AI・Web・業務システム開発と飲食店DX支援を行う福岡の開発会社。自社運営の炉端居酒屋 獅軍鶏で技術を実装・改善しています。",
    images: ["/og-v3.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/gamershub-logo.jpg",
    shortcut: "/images/gamershub-logo.jpg",
    apple: "/images/gamershub-logo.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
