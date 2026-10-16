"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/paths";
import { popButton } from "./ui";

const TITLE = "MiniVerse".split("");
const LETTER_COLORS = ["#4d7cfe", "#3bceac", "#ffd23f", "#ff8a3d", "#ff5d8f", "#8b5cf6", "#4d7cfe", "#3bceac", "#ffd23f"];

export function Hero({ gameCount }: { gameCount: number }) {
  return (
    <section className="relative px-4 pt-12 pb-16 sm:pt-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.img
          src={asset("/images/miniverse-icon.webp")}
          alt=""
          className="h-32 w-32 drop-shadow-[6px_6px_0_var(--color-ink)] sm:h-44 sm:w-44"
          initial={{ y: -200, rotate: -30, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 10 }}
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
        />

        <h1 className="mt-4 flex flex-wrap justify-center font-display text-6xl sm:text-8xl" aria-label="MiniVerse">
          {TITLE.map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block text-outline [-webkit-text-stroke-width:3px]"
              style={{ color: LETTER_COLORS[i] }}
              initial={{ y: 80, opacity: 0, scale: 0.4 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.3 + i * 0.06 }}
              whileHover={{ y: -14, rotate: i % 2 ? 8 : -8 }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-xl rounded-2xl border-[3px] border-ink bg-white px-5 py-3 text-lg font-bold shadow-pop-sm sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          IoAミニゲーム班が作った
          <span className="mx-1 inline-block rounded-md bg-pop-yellow px-1.5">{gameCount}本</span>
          のミニゲームを、
          <br className="hidden sm:inline" />
          ブラウザですぐに遊べるよ！
        </motion.p>

        <motion.a
          href="#games"
          className={popButton({ size: "xl", className: "mt-10 bg-pop-pink font-pixel text-white" })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 1.2 }}
        >
          <span className="animate-blink">▶</span> PRESS START
        </motion.a>
      </div>
    </section>
  );
}
