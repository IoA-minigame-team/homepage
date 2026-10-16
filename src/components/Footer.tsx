import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t-[3px] border-ink bg-ink text-cream">
      <div className="h-4 bg-pop-yellow bg-stripes" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center">
        <p className="font-display text-2xl">MiniVerse</p>
        <p className="text-sm opacity-80">{site.team}</p>
        <p className="text-sm opacity-60">{site.copyright}</p>
        <Link
          href="/?kiosk=1"
          prefetch={false}
          className="kiosk-hide text-xs underline decoration-dotted opacity-40 hover:opacity-100"
        >
          展示モードで開く
        </Link>
      </div>
    </footer>
  );
}
