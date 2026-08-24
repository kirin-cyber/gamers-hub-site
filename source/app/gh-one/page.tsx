import type { Metadata } from "next";
import GhOneComingSoon from "./ComingSoon";

export const metadata: Metadata = {
  title: "GH ONE | COMING SOON",
  description: "GAMERS HUBの新プロダクト GH ONE。詳細は近日公開します。",
  alternates: { canonical: "/gh-one" },
  openGraph: {
    title: "GH ONE | COMING SOON",
    description: "GAMERS HUBの新プロダクト。詳細は近日公開します。",
    url: "/gh-one",
  },
  twitter: {
    title: "GH ONE | COMING SOON",
    description: "GAMERS HUBの新プロダクト。詳細は近日公開します。",
  },
};

export default function GhOnePage() {
  return <GhOneComingSoon />;
}
