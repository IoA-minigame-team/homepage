import type { MetadataRoute } from "next";
import { games } from "@/data/games";
import { members } from "@/data/members";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    ...games.map((g) => ({ url: `${site.url}/games/${g.slug}/`, priority: 0.8 })),
    ...members.map((m) => ({ url: `${site.url}/members/${m.slug}/`, priority: 0.5 })),
  ];
}
