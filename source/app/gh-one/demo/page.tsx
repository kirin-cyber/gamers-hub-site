import type { Metadata } from "next";
import GhOneComingSoon from "../ComingSoon";

export const metadata: Metadata = {
  title: "GH ONE | COMING SOON",
  description: "GAMERS HUBの新プロダクト GH ONE。詳細は近日公開します。",
  robots: { index: false, follow: false },
};

export default function GhOneDemoPage() {
  return <GhOneComingSoon />;
}
