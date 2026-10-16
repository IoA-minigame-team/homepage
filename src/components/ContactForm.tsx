"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { popButton } from "./ui";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "w-full rounded-2xl border-[3px] border-ink bg-white px-4 py-3 shadow-pop-sm outline-none transition-shadow focus:shadow-pop focus:ring-0";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="pop-card mx-auto max-w-xl bg-pop-mint p-8 text-center">
        <p className="font-display text-3xl">送信完了！</p>
        <p className="mt-3 font-bold">お問い合わせありがとうございます。内容を確認後、ご連絡させていただきます。</p>
        <button type="button" className={popButton({ className: "mt-6 bg-white" })} onClick={() => setStatus("idle")}>
          もう一度送る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="pop-card mx-auto grid max-w-xl gap-5 bg-white p-6 sm:p-8">
      <label className="grid gap-2 font-bold">
        お名前
        <input type="text" name="name" required autoComplete="name" className={field} />
      </label>
      <label className="grid gap-2 font-bold">
        メールアドレス
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="example@domain.com"
          className={field}
        />
      </label>
      <label className="grid gap-2 font-bold">
        メッセージ
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>
      {/* スパム対策（人間には見えない） */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && (
        <p role="alert" className="rounded-xl border-[3px] border-ink bg-pop-pink/30 px-4 py-2 font-bold">
          送信に失敗しました。時間をおいてもう一度お試しください。
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={popButton({ size: "lg", className: "bg-pop-yellow" })}>
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
