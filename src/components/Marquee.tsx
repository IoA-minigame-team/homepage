/** 「NOW PLAYING」の流れるテロップ */
export function Marquee({ items }: { items: string[] }) {
  const row = items.flatMap((t) => ["★", t]);
  return (
    <div className="-rotate-1 overflow-hidden border-y-[3px] border-ink bg-pop-yellow py-3" aria-hidden>
      <div className="flex w-max animate-marquee gap-6 font-display text-xl whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-6 pr-6">
            <span className="font-pixel text-pop-pink">NOW PLAYING</span>
            {row.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
