"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";
import { asset } from "@/lib/paths";

export function ScreenshotGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const move = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, move]);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full overflow-hidden rounded-2xl border-[3px] border-ink shadow-pop-sm transition-all hover:-translate-y-1 hover:rotate-1 hover:shadow-pop"
              aria-label={`${title}のスクリーンショット${i + 1}を拡大`}
            >
              <img src={asset(src)} alt="" loading="lazy" className="aspect-video w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${title}のスクリーンショット`}
          >
            <motion.img
              key={open}
              src={asset(images[open])}
              alt={`${title}のスクリーンショット${open + 1}`}
              className="max-h-[85vh] max-w-full rounded-2xl border-[3px] border-white"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <>
                <GalleryButton className="left-3" label="前の画像" onClick={() => move(-1)}>
                  <HiChevronLeft size={28} />
                </GalleryButton>
                <GalleryButton className="right-3" label="次の画像" onClick={() => move(1)}>
                  <HiChevronRight size={28} />
                </GalleryButton>
              </>
            )}
            <GalleryButton className="top-3 right-3 translate-y-0" label="閉じる" onClick={() => setOpen(null)}>
              <HiXMark size={28} />
            </GalleryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GalleryButton({
  className,
  label,
  onClick,
  children,
}: {
  className: string;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-[3px] border-ink bg-pop-yellow shadow-pop-sm ${className}`}
    >
      {children}
    </button>
  );
}
