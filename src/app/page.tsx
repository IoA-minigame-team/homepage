import Link from "next/link";
import { games } from "@/data/games";
import { members } from "@/data/members";
import { site } from "@/data/site";
import { asset } from "@/lib/paths";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { GameCard } from "@/components/GameCard";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero gameCount={games.length} />
      <Marquee items={games.map((g) => g.title)} />

      <section id="games" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-20">
        <SectionTitle sub="Games">ゲームであそぶ</SectionTitle>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <li key={game.slug}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <GameCard game={game} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="mx-auto max-w-4xl scroll-mt-24 px-4 pt-24">
        <SectionTitle sub="About" color="var(--color-pop-mint)">
          チームについて
        </SectionTitle>
        <Reveal>
          <div className="pop-card relative bg-white p-6 text-lg leading-loose font-bold sm:p-10">
            <span className="absolute -top-5 -left-3 -rotate-6 rounded-xl border-[3px] border-ink bg-pop-yellow px-3 py-1 font-pixel text-sm shadow-pop-sm">
              {site.team}
            </span>
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="members" className="mx-auto max-w-5xl scroll-mt-24 px-4 pt-24">
        <SectionTitle sub="Members" color="var(--color-pop-pink)">
          メンバー紹介
        </SectionTitle>
        <ul className="grid gap-8 sm:grid-cols-2">
          {members.map((m, i) => (
            <li key={m.slug}>
              <Reveal delay={i * 0.1}>
                <Link
                  href={`/members/${m.slug}/`}
                  className="group pop-card flex items-center gap-5 p-5 transition-transform hover:-translate-y-1.5 hover:shadow-pop-lg"
                >
                  <img
                    src={asset(m.photo)}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-full border-[3px] border-ink object-cover transition-transform group-hover:rotate-6"
                    style={{ boxShadow: `4px 4px 0 ${m.color}` }}
                  />
                  <div className="min-w-0">
                    <p className="font-display text-2xl">{m.name}</p>
                    <p className="text-sm font-bold opacity-70">{m.role}</p>
                    <p className="mt-2 rounded-xl px-3 py-1 text-sm font-bold" style={{ background: `${m.color}33` }}>
                      「{m.comment}」
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="kiosk-hide mx-auto max-w-5xl scroll-mt-24 px-4 pt-24">
        <SectionTitle sub="Contact" color="var(--color-pop-blue)">
          お問い合わせ
        </SectionTitle>
        <p className="mb-8 text-center font-bold">ゲームの感想・バグ報告・お仕事のご相談など、お気軽にどうぞ！</p>
        <ContactForm />
      </section>
    </>
  );
}
