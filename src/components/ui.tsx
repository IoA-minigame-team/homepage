import clsx from "clsx";

/** ポップなボタンの見た目（Link / a / button 共通で className に渡す） */
export function popButton({
  size = "md",
  className,
}: { size?: "sm" | "md" | "lg" | "xl"; className?: string } = {}) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink font-bold text-ink shadow-pop",
    "transition-[transform,box-shadow] duration-150 ease-out select-none",
    "hover:-translate-y-1 hover:shadow-pop-lg active:translate-x-1 active:translate-y-1 active:shadow-none",
    "disabled:pointer-events-none disabled:opacity-60",
    {
      sm: "px-4 py-1.5 text-sm shadow-pop-sm hover:shadow-pop",
      md: "px-6 py-2.5",
      lg: "px-8 py-3.5 text-lg",
      xl: "px-7 py-4 text-xl whitespace-nowrap sm:px-10 sm:py-5 sm:text-2xl",
    }[size],
    className,
  );
}

/** セクション見出し：ステッカー風 */
export function SectionTitle({
  children,
  sub,
  color = "var(--color-pop-yellow)",
}: {
  children: React.ReactNode;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      {sub && <span className="mb-2 font-pixel text-sm tracking-[0.3em] text-ink/60 uppercase">{sub}</span>}
      <h2
        className="-rotate-2 rounded-2xl border-[3px] border-ink px-6 py-2 font-display text-3xl shadow-pop sm:text-4xl"
        style={{ background: color }}
      >
        {children}
      </h2>
    </div>
  );
}
