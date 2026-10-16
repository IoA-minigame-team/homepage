export const site = {
  name: "MiniVerse",
  team: "IoAミニゲーム班",
  description:
    "IoAミニゲーム班「MiniVerse」が開発したミニゲームの紹介サイト。ブラウザですぐに遊べます！",
  url: "https://ioa-minigame-team.github.io/homepage",
  copyright: "© 2025 MiniVerse (kapi & riu)",
  formspreeEndpoint: "https://formspree.io/f/mldbdrqp",
  about: [
    "MiniVerseは、ゲーム開発を楽しみながら学んでいる少人数チームです。",
    "私たちは個性的で遊びやすいミニゲームの開発を目指しています。",
    "メンバーそれぞれの得意分野を活かして、企画から実装まで協力して取り組んでいます。",
    "リリースしたゲームはどなたでも無料でお楽しみいただけます。フィードバックもお待ちしています！",
  ],
  /** 展示（キオスク）モードの設定。秒数は「最後の操作からトップに戻るまで」 */
  kiosk: {
    idleSeconds: { home: 60, detail: 90, play: 180 },
    /** 「まだ遊ぶ？」カウントダウンの秒数 */
    countdownSeconds: 10,
  },
} as const;
