import Link from "next/link";
import type { Game } from "@/data/games";
import { asset } from "@/lib/paths";
import { PlatformBadges } from "./PlatformBadges";

export function GameCard({ game, index }: { game: Game; index: number }) {
  // カードごとに少しだけ傾けて並べると手作り感が出る
  const tilt = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-2", "rotate-2"][index % 5];

  return (
    <Link
      href={`/games/${game.slug}/`}
      className={`group relative block h-full ${tilt} transition-transform duration-200 hover:z-10 hover:-translate-y-2 hover:rotate-0`}
    >
      {game.isNew && (
        <span className="absolute -top-3 -right-3 z-10 rotate-12 rounded-full border-[3px] border-ink bg-pop-pink px-3 py-1 font-pixel text-sm text-white shadow-pop-sm">
          NEW!
        </span>
      )}
      <article
        className="pop-card flex h-full flex-col overflow-hidden transition-shadow group-hover:shadow-pop-lg"
        style={{ background: game.themeColor }}
      >
        <div className="relative m-3 mb-0 overflow-hidden rounded-2xl border-[3px] border-ink bg-ink">
          <img
            src={asset(game.thumbnail)}
            alt=""
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <span className="absolute right-2 bottom-2 rounded-full border-[3px] border-ink bg-pop-yellow px-3 py-1 text-sm font-bold opacity-0 shadow-pop-sm transition-all group-hover:opacity-100">
            {game.play.type === "onsite" ? "▶ くわしく" : "▶ あそぶ"}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-display text-xl leading-snug">{game.title}</h3>
          <p className="flex-1 text-sm font-bold">{game.catch}</p>
          <PlatformBadges platforms={game.platforms} />
        </div>
      </article>
    </Link>
  );
}
