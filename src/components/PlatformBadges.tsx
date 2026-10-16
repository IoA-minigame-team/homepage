import clsx from "clsx";
import { HiComputerDesktop, HiDevicePhoneMobile } from "react-icons/hi2";
import type { Platform } from "@/data/games";

const LABEL: Record<Platform, string> = { pc: "PC", mobile: "スマホ" };

export function PlatformBadges({ platforms, className }: { platforms: Platform[]; className?: string }) {
  return (
    <ul className={clsx("flex flex-wrap gap-1.5", className)} aria-label="対応デバイス">
      {platforms.map((p) => (
        <li
          key={p}
          className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-xs font-bold"
        >
          {p === "pc" ? <HiComputerDesktop /> : <HiDevicePhoneMobile />}
          {LABEL[p]}
        </li>
      ))}
    </ul>
  );
}
