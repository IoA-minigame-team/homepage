"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HiArrowLeft, HiArrowsPointingIn, HiArrowsPointingOut, HiHome } from "react-icons/hi2";
import type { Platform } from "@/data/games";
import { asset } from "@/lib/paths";
import { reportActivity, useKiosk } from "./kiosk";
import { popButton } from "./ui";

/**
 * Unity 標準 WebGL テンプレートを iframe 内で枠いっぱいに広げる CSS。
 * 同一オリジンなので親から注入でき、Unity 側を再ビルドしても手直し不要。
 */
const EMBED_CSS = `
html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #1a1a2e; }
#unity-container { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; transform: none !important; }
#unity-canvas { width: 100% !important; height: 100% !important; display: block; }
#unity-footer, #unity-loading-bar { display: none !important; }
`;

const ACTIVITY_EVENTS = ["pointerdown", "pointermove", "keydown", "touchstart", "wheel"];

export function UnityFrame({
  src,
  title,
  slug,
  aspect = "16 / 10",
  platforms,
}: {
  src: string;
  title: string;
  slug: string;
  aspect?: string;
  platforms: Platform[];
}) {
  const { kiosk } = useKiosk();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [mobileWarning, setMobileWarning] = useState(false);

  const [w, h] = aspect.split("/").map((n) => Number(n.trim()));
  const ratio = w / h;

  useEffect(() => {
    // スマホ非対応ゲームをタッチ端末で開いたら注意を出す
    const isMobile = window.matchMedia("(pointer: coarse)").matches && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isMobile && !platforms.includes("mobile")) setMobileWarning(true);
  }, [platforms]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const onLoad = useCallback(() => {
    const frame = iframeRef.current;
    const doc = frame?.contentDocument;
    const win = frame?.contentWindow;
    if (!frame || !doc || !win || doc.getElementById("miniverse-embed")) return;

    const style = doc.createElement("style");
    style.id = "miniverse-embed";
    style.textContent = EMBED_CSS;
    doc.head.appendChild(style);

    // iframe 内の操作は親 window に届かないので、展示モードの放置タイマーに転送する
    let last = 0;
    const forward = () => {
      const now = Date.now();
      if (now - last > 1000) {
        last = now;
        reportActivity();
      }
    };
    for (const ev of ACTIVITY_EVENTS) win.addEventListener(ev, forward, { passive: true, capture: true });

    // Unity のローディングバーの進み具合を読み取ってこちらのローディング表示に反映
    const timer = window.setInterval(() => {
      const bar = doc.querySelector<HTMLElement>("#unity-progress-bar-full");
      const loading = doc.querySelector<HTMLElement>("#unity-loading-bar");
      if (bar) setProgress(parseFloat(bar.style.width) / 100 || 0);
      if (loading && loading.style.display === "none") {
        setReady(true);
        window.clearInterval(timer);
        win.focus();
      }
    }, 200);
  }, []);

  // ハイドレーション前に iframe の読み込みが終わっていた場合の取りこぼし対策
  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (doc?.readyState === "complete" && doc.URL !== "about:blank") onLoad();
  }, [onLoad]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapperRef.current?.requestFullscreen().catch(() => {});
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-3 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/games/${slug}/`} className={popButton({ size: "sm", className: "bg-white" })}>
          <HiArrowLeft /> 説明にもどる
        </Link>
        <h1 className="font-display text-xl sm:text-2xl">{title}</h1>
        <button type="button" onClick={toggleFullscreen} className={popButton({ size: "sm", className: "bg-pop-mint" })}>
          <HiArrowsPointingOut /> 全画面
        </button>
      </div>

      <div
        ref={wrapperRef}
        className="relative mx-auto overflow-hidden rounded-3xl border-[3px] border-ink bg-ink shadow-pop-lg [&:fullscreen]:rounded-none [&:fullscreen]:border-0"
        style={
          fullscreen
            ? { width: "100vw", height: "100vh" }
            : { width: `min(100%, calc((100dvh - 12rem) * ${ratio}))`, aspectRatio: aspect }
        }
      >
        <iframe
          ref={iframeRef}
          src={asset(src)}
          title={title}
          onLoad={onLoad}
          allow="fullscreen; autoplay; gamepad"
          className="absolute inset-0 h-full w-full"
        />

        {!ready && (
          <div className="absolute inset-0 grid place-items-center bg-ink text-cream">
            <div className="flex w-64 flex-col items-center gap-4">
              <motion.img
                src={asset("/images/miniverse-icon.webp")}
                alt=""
                className="h-20 w-20"
                animate={{ y: [0, -16, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <p className="font-pixel text-xl">NOW LOADING…</p>
              <div className="h-5 w-full overflow-hidden rounded-full border-[3px] border-cream">
                <div
                  className="h-full bg-pop-yellow bg-stripes transition-[width] duration-200"
                  style={{ width: `${Math.max(progress, 0.03) * 100}%` }}
                />
              </div>
              <p className="font-pixel text-sm opacity-70">{Math.round(progress * 100)}%</p>
            </div>
          </div>
        )}

        {mobileWarning && (
          <div className="absolute inset-0 grid place-items-center bg-ink/90 p-4">
            <div className="pop-card max-w-sm bg-pop-yellow p-6 text-center">
              <p className="font-display text-xl">このゲームはPC向けです</p>
              <p className="mt-2 font-bold">スマホではうまく遊べないかも…。PCで遊んでみてね！</p>
              <button type="button" className={popButton({ className: "mt-4 bg-white" })} onClick={() => setMobileWarning(false)}>
                それでも遊ぶ
              </button>
            </div>
          </div>
        )}

        {/* 全画面中・展示モード中はゲームの上に「もどる」ボタンを重ねる */}
        {(fullscreen || kiosk) && (
          <div className="absolute top-3 left-3 flex gap-2">
            <Link
              href={kiosk ? "/" : `/games/${slug}/`}
              onClick={() => document.fullscreenElement && document.exitFullscreen()}
              className={popButton({ size: "sm", className: "bg-pop-yellow opacity-80 hover:opacity-100" })}
            >
              {kiosk ? <HiHome /> : <HiArrowLeft />} {kiosk ? "ホームへ" : "もどる"}
            </Link>
            {fullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className={popButton({ size: "sm", className: "bg-white opacity-80 hover:opacity-100" })}
              >
                <HiArrowsPointingIn /> 全画面をやめる
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-sm font-bold opacity-70">
        ゲームが反応しないときは、ゲーム画面を一度クリック（タップ）してね
      </p>
    </div>
  );
}
