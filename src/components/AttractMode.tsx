"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { games } from "@/data/games";
import { asset } from "@/lib/paths";

const SLIDES = games.flatMap((g) => g.screenshots.slice(0, 2).map((src) => ({ src, game: g })));
const SLIDE_MS = 5000;

/** 展示モードでトップを放置したときのスライドショー。どこかに触れると閉じる（IdleWatcher が制御） */
export function AttractMode() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(t);
  }, []);

  const slide = SLIDES[index];

  return (
    <motion.div
      className="fixed inset-0 z-[100] cursor-none overflow-hidden bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        <motion.img
          key={slide.src + index}
          src={asset(slide.src)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1 }, scale: { duration: SLIDE_MS / 1000 + 1, ease: "linear" } }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-transparent to-ink/40" />

      <div className="absolute top-6 left-6 flex items-center gap-3">
        <img src={asset("/images/miniverse-icon.webp")} alt="" className="h-16 w-16" />
        <span className="font-display text-4xl text-white text-outline">MiniVerse</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.game.slug}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <span
              className="inline-block rounded-full border-[3px] border-ink px-4 py-1 font-bold shadow-pop-sm"
              style={{ background: slide.game.themeColor }}
            >
              {slide.game.catch}
            </span>
            <p className="mt-3 font-display text-4xl text-white text-outline sm:text-6xl">{slide.game.title}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-8 animate-blink text-center font-pixel text-3xl text-pop-yellow sm:text-5xl">
          TOUCH TO START
        </p>
      </div>
    </motion.div>
  );
}
