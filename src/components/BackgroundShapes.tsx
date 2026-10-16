/** 背景にふわふわ浮かぶ図形（装飾のみ） */
const SHAPES = [
  { shape: "star", color: "var(--color-pop-yellow)", top: "12%", left: "4%", size: 46, r: "-12deg", delay: "0s" },
  { shape: "circle", color: "var(--color-pop-pink)", top: "30%", left: "92%", size: 34, r: "0deg", delay: "-2s" },
  { shape: "triangle", color: "var(--color-pop-mint)", top: "58%", left: "6%", size: 40, r: "18deg", delay: "-4s" },
  { shape: "star", color: "var(--color-pop-blue)", top: "78%", left: "88%", size: 38, r: "8deg", delay: "-1s" },
  { shape: "circle", color: "var(--color-pop-orange)", top: "90%", left: "18%", size: 26, r: "0deg", delay: "-3s" },
  { shape: "triangle", color: "var(--color-pop-purple)", top: "6%", left: "70%", size: 30, r: "-20deg", delay: "-5s" },
] as const;

const PATHS = {
  star: "M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z",
  circle: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z",
  triangle: "M12 3l10 18H2z",
};

export function BackgroundShapes() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {SHAPES.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          className="absolute animate-float opacity-70"
          style={{ top: s.top, left: s.left, animationDelay: s.delay, ["--r" as string]: s.r }}
        >
          <path d={PATHS[s.shape]} fill={s.color} stroke="var(--color-ink)" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}
