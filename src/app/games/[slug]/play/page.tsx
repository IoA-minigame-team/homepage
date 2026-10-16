import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games, getGame } from "@/data/games";
import { UnityFrame } from "@/components/UnityFrame";

export const dynamicParams = false;

// サイト内で遊べる（embed の）ゲームだけプレイ画面を生成する
export function generateStaticParams() {
  return games.filter((g) => g.play.type === "embed").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/games/[slug]/play">): Promise<Metadata> {
  const game = getGame((await params).slug);
  return game ? { title: `${game.title} をプレイ` } : {};
}

export default async function PlayPage({ params }: PageProps<"/games/[slug]/play">) {
  const game = getGame((await params).slug);
  if (!game || game.play.type !== "embed") notFound();

  return (
    <UnityFrame
      src={game.play.src}
      aspect={game.play.aspect}
      title={game.title}
      slug={game.slug}
      platforms={game.platforms}
    />
  );
}
