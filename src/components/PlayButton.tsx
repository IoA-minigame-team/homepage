"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaAndroid } from "react-icons/fa6";
import { HiArrowTopRightOnSquare, HiPlay } from "react-icons/hi2";
import type { Game } from "@/data/games";
import { useKiosk } from "./kiosk";
import { popButton } from "./ui";

/** compact: ページ下部など、2 回目以降に出すときの簡易表示 */
export function PlayButton({ game, compact = false }: { game: Game; compact?: boolean }) {
  const { kiosk } = useKiosk();
  const [confirming, setConfirming] = useState(false);
  const className = popButton({ size: "xl", className: "bg-pop-yellow font-display" });

  if (game.play.type === "embed") {
    return (
      <Link href={`/games/${game.slug}/play/`} className={className}>
        <HiPlay className="animate-pulse" /> ゲームをプレイ！
      </Link>
    );
  }

  if (game.play.type === "onsite") {
    const { device } = game.play;
    if (compact) {
      return (
        <p className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-6 py-3 text-lg font-bold">
          <FaAndroid className="text-2xl text-[#3ddc84]" /> 展示会場の{device}で遊べます
        </p>
      );
    }
    return (
      <div className="pop-card max-w-md bg-white p-5">
        <p className="flex items-center gap-2 font-display text-xl sm:text-2xl">
          <FaAndroid className="shrink-0 text-3xl text-[#3ddc84]" />
          <span>
            会場の{device}で<span className="inline-block">遊んでね！</span>
          </span>
        </p>
        <p className="mt-2 font-bold">
          このゲームは展示用に用意したゲームです。近くに置いてある{device}を手に取って、遊んでみてください！
        </p>
        <p className="kiosk-hide mt-3 rounded-xl border-2 border-ink/20 bg-cream p-3 text-sm font-bold">
          ※ 展示会場以外からご覧の方へ：このゲームは展示会での体験専用のため、このサイトからダウンロード・プレイすることはできません。ご了承ください。
        </p>
      </div>
    );
  }

  const { url, label } = game.play;
  return (
    <>
      <a
        href={url}
        target={kiosk ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={className}
        onClick={(e) => {
          // 展示モードでは外部サイトから戻れなくなるので、確認を挟む
          if (kiosk) {
            e.preventDefault();
            setConfirming(true);
          }
        }}
      >
        <HiPlay /> {label} でプレイ！ <HiArrowTopRightOnSquare className="text-xl" />
      </a>

      <AnimatePresence>
        {confirming && (
          <motion.div
            className="fixed inset-0 z-[95] grid place-items-center bg-ink/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="pop-card w-full max-w-md bg-white p-6 text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <p className="font-display text-2xl">{label} に移動します</p>
              <p className="mt-3 font-bold">
                外部のサイトでゲームが始まります。
                <br />
                終わったらブラウザの「戻る」で戻ってね。わからないときはスタッフに声をかけてください！
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" className={popButton({ className: "bg-white" })} onClick={() => setConfirming(false)}>
                  やめる
                </button>
                <a href={url} className={popButton({ className: "bg-pop-yellow" })}>
                  遊びに行く！
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
