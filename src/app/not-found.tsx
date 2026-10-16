import Link from "next/link";
import { popButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 pt-24 text-center">
      <p className="font-pixel text-7xl text-pop-pink">404</p>
      <p className="mt-2 font-pixel text-3xl">GAME OVER…</p>
      <p className="mt-6 font-bold">お探しのページは見つかりませんでした。</p>
      <Link href="/" className={popButton({ size: "lg", className: "mt-8 bg-pop-yellow" })}>
        ▶ CONTINUE（トップへ）
      </Link>
    </div>
  );
}
