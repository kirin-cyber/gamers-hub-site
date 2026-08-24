import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.gamershub.jp/",
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.gamershub.jp/gh-one/",
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
