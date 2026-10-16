import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiExclamationTriangle } from "react-icons/hi2";
import { games, getGame } from "@/data/games";
import { site } from "@/data/site";
import { asset } from "@/lib/paths";
import { PlatformBadges } from "@/components/PlatformBadges";
import { PlayButton } from "@/components/PlayButton";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { ShareButtons } from "@/components/ShareButtons";
import { Reveal } from "@/components/Reveal";
import { popButton } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/games/[slug]">): Promise<Metadata> {
  const game = getGame((await params).slug);
  if (!game) return {};
  return {
    title: game.title,
    description: `${game.catch} ${game.description[0]}`,
    openGraph: { title: game.title, description: game.catch, images: [`${site.url}${game.thumbnail}`] },
  };
}

function Panel({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="pop-card relative bg-white p-6 pt-9 sm:p-8 sm:pt-10">
        <h2
          className="absolute -top-5 left-5 -rotate-2 rounded-xl border-[3px] border-ink px-4 py-1 font-display text-xl shadow-pop-sm"
          style={{ background: color }}
        >
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

export default async function GamePage({ params }: PageProps<"/games/[slug]">) {
  const game = getGame((await params).slug);
  if (!game) notFound();

  return (
    <article className="pb-8">
      {/* ヒーロー：テーマ色の帯 */}
      <div className="relative mt-8 border-y-[3px] border-ink" style={{ background: game.themeColor }}>
        <div className="bg-stripes">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-14">
            <Reveal>
              <img
                src={asset(game.thumbnail)}
                alt={game.title}
                className="mx-auto aspect-square w-full max-w-sm -rotate-2 rounded-3xl border-[3px] border-ink object-cover shadow-pop-lg"
              />
            </Reveal>
            <div className="flex flex-col items-start gap-4">
              {game.isNew && (
                <span className="rounded-full border-[3px] border-ink bg-pop-pink px-3 py-0.5 font-pixel text-white">
                  NEW!
                </span>
              )}
              <h1 className="font-display text-4xl leading-tight text-white text-outline [-webkit-text-stroke-width:3px] sm:text-6xl">
                {game.title}
              </h1>
              <p className="rounded-2xl border-[3px] border-ink bg-white px-4 py-2 text-lg font-bold shadow-pop-sm">
                {game.catch}
              </p>
              <PlatformBadges platforms={game.platforms} />
              <div className="mt-4">
                <PlayButton game={game} />
              </div>
              {game.platformNote && (
                <p className="flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-1 text-sm font-bold">
                  <HiExclamationTriangle className="shrink-0" /> {game.platformNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-12 px-4">
        <Panel title="ゲーム概要" color="var(--color-pop-yellow)">
          <div className="space-y-2 leading-relaxed font-bold">
            {game.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {game.features.map((f) => (
              <li
                key={f}
                className="rounded-full border-[3px] border-ink px-3 py-1 text-sm font-bold"
                style={{ background: `${game.themeColor}55` }}
              >
                ★ {f}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="ゲームイメージ" color="var(--color-pop-mint)">
          <ScreenshotGallery images={game.screenshots} title={game.title} />
        </Panel>

        <Panel title="あそびかた" color="var(--color-pop-pink)">
          <dl className="grid gap-4">
            {game.controls.map((c) => (
              <div key={c.label} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:items-start">
                <dt className="font-display">{c.label}</dt>
                <dd className="font-bold">
                  {c.keys && (
                    <span className="mb-2 flex flex-wrap gap-1.5">
                      {c.keys.map((k) => (
                        <kbd
                          key={k}
                          className="min-w-10 rounded-lg border-[3px] border-ink bg-cream px-2 py-1 text-center font-pixel shadow-[0_3px_0_var(--color-ink)]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  )}
                  {c.text}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="開発情報" color="var(--color-pop-blue)">
          <dl className="grid gap-3 font-bold sm:grid-cols-3">
            {[
              ["開発開始", game.devStart],
              ["開発者", game.developers.join("・")],
              ["使用技術", game.tech.join(" / ")],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border-[3px] border-ink bg-cream p-3">
                <dt className="text-sm opacity-60">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <div className="kiosk-hide">
          <Panel title="感想をシェア" color="var(--color-pop-orange)">
            <ShareButtons slug={game.slug} title={game.title} />
          </Panel>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <PlayButton game={game} />
          <Link href="/#games" className={popButton({ size: "lg", className: "bg-white" })}>
            <HiArrowLeft /> ほかのゲームを見る
          </Link>
        </div>
      </div>
    </article>
  );
}
