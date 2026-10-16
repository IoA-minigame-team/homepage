import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { HiArrowLeft } from "react-icons/hi2";
import { getGame } from "@/data/games";
import { getMember, members } from "@/data/members";
import { asset } from "@/lib/paths";
import { Reveal } from "@/components/Reveal";
import { popButton } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/members/[slug]">): Promise<Metadata> {
  const member = getMember((await params).slug);
  return member ? { title: member.name, description: `${member.name}（${member.role}）のプロフィール` } : {};
}

const LINK_ICON = { x: FaXTwitter, github: FaGithub, instagram: FaInstagram };
const LINK_LABEL = { x: "X", github: "GitHub", instagram: "Instagram" };

export default async function MemberPage({ params }: PageProps<"/members/[slug]">) {
  const member = getMember((await params).slug);
  if (!member) notFound();

  const works = member.works.map((w) => {
    if ("game" in w) {
      const game = getGame(w.game);
      return game && { key: game.slug, title: game.title, image: game.thumbnail, note: w.note, href: `/games/${game.slug}/` };
    }
    return { key: w.title, title: w.title, image: w.image, note: w.note, href: "/" };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 pt-12">
      <Reveal>
        <section className="pop-card relative overflow-hidden">
          <div className="h-28 border-b-[3px] border-ink bg-stripes" style={{ background: member.color }}>
            <div className="h-full bg-stripes" />
          </div>
          <div className="flex flex-col items-center gap-4 px-6 pb-8 text-center sm:flex-row sm:items-end sm:text-left">
            <img
              src={asset(member.photo)}
              alt={member.realName}
              className="-mt-16 h-36 w-36 rounded-full border-[3px] border-ink bg-white object-cover shadow-pop"
            />
            <div className="flex-1">
              <h1 className="font-display text-4xl">{member.name}</h1>
              <p className="font-bold opacity-70">
                {member.role} ／ {member.affiliation}
              </p>
            </div>
            {member.links.length > 0 && (
              <ul className="kiosk-hide flex gap-2">
                {member.links.map((l) => {
                  const Icon = LINK_ICON[l.type];
                  return (
                    <li key={l.type}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={LINK_LABEL[l.type]}
                        className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-white shadow-pop-sm transition-transform hover:-translate-y-1"
                      >
                        <Icon size={20} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <p
            className="mx-6 mb-8 rounded-2xl border-[3px] border-ink px-4 py-3 text-center text-lg font-bold"
            style={{ background: `${member.color}33` }}
          >
            ひとこと：「{member.comment}」
          </p>
        </section>
      </Reveal>

      <div className="mt-12 grid gap-12">
        <Reveal>
          <section className="pop-card bg-white p-6 sm:p-8">
            <h2 className="mb-4 font-display text-2xl">自己紹介</h2>
            <div className="space-y-3 leading-relaxed font-bold">
              {member.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h2 className="mt-8 mb-3 font-display text-2xl">スキル</h2>
            <ul className="flex flex-wrap gap-2">
              {member.skills.map((s) => (
                <li key={s} className="rounded-full border-[3px] border-ink bg-pop-yellow px-3 py-1 text-sm font-bold shadow-pop-sm">
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="mb-6 text-center font-display text-3xl">つくったもの</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {works.map(
                (w) =>
                  w && (
                    <li key={w.key}>
                      <Link
                        href={w.href}
                        className="pop-card group block overflow-hidden transition-transform hover:-translate-y-1.5 hover:shadow-pop-lg"
                      >
                        <img
                          src={asset(w.image)}
                          alt=""
                          loading="lazy"
                          className="aspect-square w-full border-b-[3px] border-ink object-cover"
                        />
                        <div className="p-4">
                          <p className="font-display text-lg">{w.title}</p>
                          <p className="text-sm font-bold opacity-70">{w.note}</p>
                        </div>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </section>
        </Reveal>

        <div className="text-center">
          <Link href="/#members" className={popButton({ size: "lg", className: "bg-white" })}>
            <HiArrowLeft /> メンバー一覧へ
          </Link>
        </div>
      </div>
    </div>
  );
}
