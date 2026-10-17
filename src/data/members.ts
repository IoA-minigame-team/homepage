export type Member = {
  slug: string;
  name: string;
  realName: string;
  role: string;
  affiliation: string;
  comment: string;
  photo: string;
  color: string;
  bio: string[];
  skills: string[];
  /** games.ts の slug、またはゲーム以外の作品 */
  works: ({ game: string; note: string } | { title: string; note: string; image: string })[];
  links: { type: "x" | "github" | "instagram"; url: string }[];
};

export const members: Member[] = [
  {
    slug: "kapi",
    name: "Kapi",
    realName: "髙橋荘悟",
    role: "ゲーム・Webプログラマー",
    affiliation: "金沢工業大学 IoAプロジェクト",
    comment: "個人開発楽しいっぴ",
    photo: "/images/profile/kapi_profile.webp",
    color: "#4d7cfe",
    bio: [
      "普段はゲーム開発やweb開発をやっています。",
      "誰もが楽しめるゲーム体験を作ることを目指して、日々開発に取り組んでいます。特に短時間で楽しめるミニゲームの開発に情熱を注いでいます。",
      "それ以外だと、「SAKITO」という学内で使えるアンケート・ポイ活サービスのリーダーもやってます。",
    ],
    skills: ["Unity", "C#", "HTML/CSS", "JavaScript", "ドットキャラクター制作"],
    works: [
      { title: "MiniVerse", note: "ゲーム紹介サイト（このサイト！）", image: "/images/miniverse-icon.webp" },
      { game: "speed-slash", note: "反射神経を競うアクションゲーム" },
      { game: "kaze-hichau", note: "バンサバライク避けゲー" },
      { game: "kagagosai-puzzle", note: "九谷焼の絵付けパズル" },
      { game: "sorosoro-kaerou", note: "スマホを振り返らせるウォーキングホラー" },
    ],
    links: [
      { type: "x", url: "https://x.com/kapi_0622" },
      { type: "github", url: "https://github.com/Kapi0622" },
      { type: "instagram", url: "https://www.instagram.com/sogo.0622/" },
    ],
  },
  {
    slug: "riu",
    name: "Riu",
    realName: "池本理柚",
    role: "ゲームプログラマー",
    affiliation: "金沢工業大学 IoAプロジェクト",
    comment: "ちからをためている",
    photo: "/images/profile/ikemoto_profile.webp",
    color: "#ff5d8f",
    bio: [
      "ゲームプログラマーとして活動しています。特にゲームシステムの設計と実装を担当しています。",
      "自分がゲームをするうえで、気持ちよいと思った瞬間を切り取り、その気持ちよさを無限にできるようなゲームを開発しようそうしよう。無限プチプチのようなものです。",
      "私の理論として、楽しければグラフィックはそこそこで良いと思っているので、とりあえず適当に自分で書いた絵を登場させます。",
    ],
    skills: ["Unity", "C#", "Python"],
    works: [
      { game: "kotodama", note: "ほぼ完成。アプデ待ち勢" },
      { game: "kaze-hichau", note: "バンサバライク避けゲー" },
    ],
    links: [],
  },
];

export const getMember = (slug: string) => members.find((m) => m.slug === slug);
