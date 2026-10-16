"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";
import { ACTIVITY_EVENT, useKiosk } from "./kiosk";
import { AttractMode } from "./AttractMode";

const ACTIVITY_EVENTS = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart", "scroll"] as const;

/**
 * 展示モード時の放置検知。
 * - トップで放置 → アトラクトモード（スライドショー）
 * - それ以外で放置 → 「まだ遊ぶ？」カウントダウン → 0 でトップへ戻る
 */
export function IdleWatcher() {
  const { kiosk } = useKiosk();
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"active" | "countdown" | "attract">("active");
  const [remaining, setRemaining] = useState<number>(site.kiosk.countdownSeconds);
  const lastActivity = useRef(0);

  const isHome = pathname === "/" || pathname === "";
  const idleSeconds = isHome
    ? site.kiosk.idleSeconds.home
    : /\/play\/?$/.test(pathname)
      ? site.kiosk.idleSeconds.play
      : site.kiosk.idleSeconds.detail;

  // ページ遷移したらリセット
  useEffect(() => {
    lastActivity.current = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("active");
  }, [pathname]);

  useEffect(() => {
    if (!kiosk) return;
    lastActivity.current = Date.now();
    const onActivity = () => {
      lastActivity.current = Date.now();
      setPhase((p) => (p === "active" ? p : "active"));
    };
    for (const ev of ACTIVITY_EVENTS) window.addEventListener(ev, onActivity, { passive: true, capture: true });
    window.addEventListener(ACTIVITY_EVENT, onActivity);

    const timer = window.setInterval(() => {
      const idle = (Date.now() - lastActivity.current) / 1000;
      if (idle < idleSeconds) return;
      if (isHome) {
        setPhase("attract");
        return;
      }
      const left = Math.ceil(idleSeconds + site.kiosk.countdownSeconds - idle);
      if (left <= 0) {
        lastActivity.current = Date.now();
        router.push("/");
      } else {
        setPhase("countdown");
        setRemaining(left);
      }
    }, 250);

    return () => {
      for (const ev of ACTIVITY_EVENTS) window.removeEventListener(ev, onActivity, { capture: true });
      window.removeEventListener(ACTIVITY_EVENT, onActivity);
      window.clearInterval(timer);
    };
  }, [kiosk, idleSeconds, isHome, router]);

  // アトラクトモードに入ったらトップまでスクロールしておく
  useEffect(() => {
    if (phase === "attract") window.scrollTo({ top: 0 });
  }, [phase]);

  if (!kiosk) return null;

  return (
    <AnimatePresence>
      {phase === "attract" && <AttractMode key="attract" />}
      {phase === "countdown" && (
        <motion.div
          key="countdown"
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="pop-card w-full max-w-md bg-pop-yellow p-8 text-center"
            initial={{ scale: 0.6, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <p className="font-display text-3xl">まだ遊ぶ？</p>
            <motion.p
              key={remaining}
              className="my-4 font-pixel text-7xl"
              initial={{ scale: 1.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {remaining}
            </motion.p>
            <p className="font-bold">画面をタッチすると続けられるよ！</p>
            <p className="mt-1 text-sm">このままだとトップに戻ります</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
