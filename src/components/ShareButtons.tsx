"use client";

import { useState } from "react";
import { FaFacebookF, FaLine, FaXTwitter } from "react-icons/fa6";
import { site } from "@/data/site";
import { popButton } from "./ui";

const MAX = 280;

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [text, setText] = useState("");
  const url = `${site.url}/games/${slug}/`;
  const hashtags = `#${title.replace(/[\s、。!！?？]/g, "")} #IoAミニゲーム`;
  const body = `${text || `「${title}」を遊んだよ！`} ${hashtags}`;

  const targets = [
    {
      label: "X でシェア",
      icon: <FaXTwitter />,
      className: "bg-ink text-white",
      href: `https://x.com/intent/post?text=${encodeURIComponent(body)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "LINE で送る",
      icon: <FaLine />,
      className: "bg-[#06c755] text-white",
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(body)}`,
    },
    {
      label: "Facebook",
      icon: <FaFacebookF />,
      className: "bg-[#4267b2] text-white",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="grid gap-4">
      <label className="grid gap-2 font-bold">
        感想を書いてシェアしよう！
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX}
          rows={3}
          placeholder={`「${title}」を遊んだ感想を書いてね…`}
          className="w-full resize-y rounded-2xl border-[3px] border-ink bg-white px-4 py-3 shadow-pop-sm outline-none focus:shadow-pop"
        />
      </label>
      <p className={`text-right text-sm font-bold ${text.length > MAX - 40 ? "text-pop-pink" : "opacity-60"}`}>
        {text.length}/{MAX}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {targets.map((t) => (
          <a
            key={t.label}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className={popButton({ className: t.className })}
          >
            {t.icon}
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}
