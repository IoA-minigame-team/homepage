"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import clsx from "clsx";
import { asset } from "@/lib/paths";
import { useKiosk } from "./kiosk";

const NAV = [
  { href: "/#games", label: "ゲーム", color: "bg-pop-yellow", hover: "hover:bg-pop-yellow" },
  { href: "/#about", label: "チーム", color: "bg-pop-mint", hover: "hover:bg-pop-mint" },
  { href: "/#members", label: "メンバー", color: "bg-pop-pink", hover: "hover:bg-pop-pink" },
  { href: "/#contact", label: "お問い合わせ", color: "bg-pop-blue", hover: "hover:bg-pop-blue", kioskHide: true },
];

const EXIT_HOLD_MS = 3000;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { kiosk, setKiosk } = useKiosk();
  const holdTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ページ遷移でメニューを閉じる
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  // 展示モード中はロゴを 3 秒長押しで解除（スタッフ用）
  const startHold = () => {
    if (!kiosk) return;
    holdTimer.current = window.setTimeout(() => {
      if (window.confirm("展示モードを終了しますか？")) setKiosk(false);
    }, EXIT_HOLD_MS);
  };
  const cancelHold = () => window.clearTimeout(holdTimer.current);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={clsx(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border-[3px] border-ink bg-white py-2 pr-2 pl-3 transition-shadow",
          scrolled ? "shadow-pop" : "shadow-pop-sm",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2"
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          draggable={false}
        >
          <img
            src={asset("/images/miniverse-icon.webp")}
            alt=""
            className="h-10 w-10 transition-transform group-hover:animate-wiggle"
            draggable={false}
          />
          <span className="font-display text-xl tracking-wide sm:text-2xl">MiniVerse</span>
        </Link>

        <nav className="hidden md:block" aria-label="メインメニュー">
          <ul className="flex items-center gap-2">
            {NAV.map((item) => (
              <li key={item.href} className={clsx(item.kioskHide && "kiosk-hide")}>
                <Link
                  href={item.href}
                  className={clsx(
                    "block rounded-full border-[3px] border-transparent px-4 py-1.5 font-bold transition-all",
                    "hover:-translate-y-0.5 hover:border-ink hover:shadow-pop-sm",
                    item.hover,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-pop-yellow shadow-pop-sm md:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiXMark size={24} /> : <HiBars3 size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mx-auto mt-3 max-w-6xl md:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            aria-label="メインメニュー"
          >
            <ul className="pop-card grid gap-2 p-3">
              {NAV.map((item) => (
                <li key={item.href} className={clsx(item.kioskHide && "kiosk-hide")}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "block rounded-2xl border-[3px] border-ink px-4 py-3 text-center font-bold shadow-pop-sm",
                      item.color,
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
