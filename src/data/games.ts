export type Platform = "pc" | "mobile";

export type PlayTarget =
  /** public/game/<slug>/index.html をサイト内のプレイ画面で遊ぶ */
  | { type: "embed"; src: string; aspect?: string }
  /** unityroom などの外部サイトへリンクする */
  | { type: "external"; url: string; label: string };

export type Game = {
  slug: string;
  title: string;
  /** カードやヒーローに出す一言キャッチコピー */
  catch: string;
  description: string[];
  features: string[];
  controls: { label: string; text: string; keys?: string[] }[];
  /** 正方形のサムネイル（public/ からのパス） */
  thumbnail: string;
  screenshots: string[];
  /** カード・詳細ページのアクセント色 */
  themeColor: string;
  platforms: Platform[];
  /** 対応状況の補足（スマホ対応が怪しい等） */
  platformNote?: string;
  devStart: string;
  developers: string[];
  tech: string[];
  play: PlayTarget;
  isNew?: boolean;
};

export const games: Game[] = [
  {
    slug: "catan",
    title: "これであなたもカタンマスター",
    catch: "遊びながらカタンのルールを覚えよう！",
    description: [
      "ボードゲーム「カタン」のルールを、ムービーとチュートリアルで楽しく学べるゲームです。",
      "資源の集め方から開拓、ほかのプレイヤーとの交渉まで、ステップごとに体験しながら覚えられます。",
      "これを遊べば、初めてのカタンでも迷わない！",
    ],
    features: ["ルールをゼロから学べる", "ムービーでわかりやすく解説", "カタン初心者におすすめ"],
    controls: [{ label: "基本操作", text: "マウスクリック（スマホではタップ）で進めます。" }],
    thumbnail: "/images/game/catan/catan.webp",
    screenshots: ["/images/game/catan/catan-1.webp", "/images/game/catan/catan-2.webp"],
    themeColor: "#ff8a3d",
    platforms: ["pc", "mobile"],
    platformNote: "スマホ対応は一応してありますが、正常な挙動は保証できません",
    devStart: "2025年12月",
    developers: ["MiniVerse"],
    tech: ["Unity"],
    play: { type: "embed", src: "/game/catan/index.html", aspect: "16 / 9" },
    isNew: true,
  },
  {
    slug: "kagagosai-puzzle",
    title: "加賀五彩パズル",
    catch: "九谷焼の絵付けをパズルで体験！",
    description: [
      "石川県の伝統工芸「九谷焼」の絵付けを、小さなお子様でも直感的に楽しめるデジタルパズルゲームとして再構築した作品です。",
      "プレイヤーは、加賀藩前田家が奨励した「加賀五彩」（藍、臙脂、草、黄土、古代紫）をモチーフにした美しいピースを使い、時間内にお題となる器の模様を次々と完成させていきます。",
      "遊ぶたびに問題が自動生成されるため、何度でも新鮮な気持ちで挑戦できます。",
    ],
    features: ["ドラッグ＆ドロップだけのかんたん操作", "遊ぶたびに問題が変わる", "伝統工芸にふれられる"],
    controls: [
      {
        label: "ピースを動かす",
        text: "画面上のピースを、皿の中にある同じ形の穴までドラッグ＆ドロップで移動させます。",
      },
      {
        label: "対応デバイス",
        text: "PCではマウス、スマートフォンやタブレットでは指によるタッチ操作に対応しています。",
      },
    ],
    thumbnail: "/images/game/kagagosai/kagagosai.webp",
    screenshots: [
      "/images/game/kagagosai/kagagosai-1.webp",
      "/images/game/kagagosai/kagagosai-2.webp",
      "/images/game/kagagosai/kagagosai-3.webp",
      "/images/game/kagagosai/kagagosai-4.webp",
    ],
    themeColor: "#7aa2ff",
    platforms: ["pc", "mobile"],
    platformNote: "スマホ対応は一応してありますが、正常な挙動は保証できません",
    devStart: "2025年9月",
    developers: ["髙橋荘悟"],
    tech: ["Unity"],
    // サイト内で遊べるようにする場合は public/game/kagagosai-puzzle/ にビルドを置き、
    // { type: "embed", src: "/game/kagagosai-puzzle/index.html" } に書き換える
    play: { type: "external", url: "https://unityroom.com/games/kagagoshiki-puzzle", label: "unityroom" },
  },
  {
    slug: "kaze-hichau",
    title: "かぜ、ひいちゃう",
    catch: "バンサバライク避けゲー！1秒でも長く生き延びろ",
    description: [
      "謎のウイルスが蔓延し、人々が咳き込みながらさまよう荒廃した世界。",
      "君は数少ない正気な生存者だ。",
      "次々と襲い来る敵の攻撃をひたすら避け、落ちているマスクを命綱にして1秒でも長く生き延びろ！",
      "簡単操作でスリル満点のエンドレス・サバイバルスコアアタック！",
    ],
    features: ["シンプルな操作", "短い時間でプレイできる！！", "ちょっと暇なときどうぞ"],
    controls: [
      { label: "移動", text: "プレイヤーを上下左右に移動させます。", keys: ["W", "A", "S", "D", "↑", "←", "↓", "→"] },
      { label: "目的", text: "敵や敵の弾に当たらないように、できるだけ長く生き延びてハイスコアを目指します。" },
      { label: "マスク", text: "取得すると一定時間無敵になります。無敵中は敵や弾に当たってもゲームオーバーになりません。" },
      { label: "ゲームオーバー", text: "敵、または敵が発射した弾に当たるとゲームオーバーになります。" },
    ],
    thumbnail: "/images/game/kaze-hichau.webp",
    screenshots: [
      "/images/game/kaze-hichau/image-1.webp",
      "/images/game/kaze-hichau/image-2.webp",
      "/images/game/kaze-hichau/image-3.webp",
    ],
    themeColor: "#2fbf9b",
    platforms: ["pc"],
    platformNote: "現状はスマホ非対応です。PCでお楽しみください。",
    devStart: "2025年8月",
    developers: ["髙橋荘悟", "池本理柚"],
    tech: ["Unity"],
    play: { type: "embed", src: "/game/kaze-hichau/index.html" },
  },
  {
    slug: "kotodama",
    title: "言霊登竜門",
    catch: "タイプ！タイプ！風船を宇宙まで飛ばせ！",
    description: [
      "言霊登竜門は、素早い反射神経と正確なタイプ力が求められるゲームです。",
      "宇宙まで風船を飛ばせ！タイプ！タイプ！スマホだったらタッチ！タッチ！",
      "AIUEOオンリーなので頭空っぽにしてどうぞ。",
      "右のゲージをためるとボーナスタイム！6秒間ミスってもいいぞ！",
      "昨日の自分を超えていけ。",
    ],
    features: ["シンプルな操作", "短い時間でプレイできる！！", "ちょっと暇なときどうぞ"],
    controls: [{ label: "タイプ", text: "流れてくる母音をタイプ！すると始まるぞ！", keys: ["A", "I", "U", "E", "O"] }],
    thumbnail: "/images/game/kotodama.webp",
    screenshots: ["/images/game/kotodama.webp", "/images/game/kotodama2.webp"],
    themeColor: "#ff5d8f",
    platforms: ["pc", "mobile"],
    platformNote: "スマホでもタッチで遊べます（動作は保証できません）",
    devStart: "2025年4月",
    developers: ["池本理柚"],
    tech: ["Unity"],
    play: { type: "embed", src: "/game/kotodama/index.html" },
  },
  {
    slug: "speed-slash",
    title: "Speed Slash",
    catch: "「！」が出たら即斬れ！反射神経バトル",
    description: [
      "Speed Slashは、素早い反射神経と正確なタイミングが求められるアクションゲームです。",
      "画面上に「！」が現れたら素早く斬る！",
      "お手付きしてしまうと、負けになるぞ。",
    ],
    features: ["シンプルな操作", "短い時間でプレイできる！！", "反射神経を鍛えるのにおすすめ"],
    controls: [{ label: "斬る", text: "SPACEキーを押すと斬れます。", keys: ["SPACE"] }],
    thumbnail: "/images/game/speed_slash.webp",
    screenshots: ["/images/game/speed_slash.webp", "/images/game/speed_slash2.webp"],
    themeColor: "#ffb020",
    platforms: ["pc"],
    platformNote: "現状はスマホ非対応です。PCでお楽しみください。",
    devStart: "2025年4月",
    developers: ["髙橋荘悟"],
    tech: ["Unity", "UnityAssets_SPAM"],
    play: { type: "embed", src: "/game/speed-slash/index.html" },
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

/** 旧サイトの URL（kotodama.html など）→ slug。public/ のリダイレクトスタブ生成に使用 */
export const legacyPages: Record<string, string> = {
  "speed_slash.html": "speed-slash",
  "kotodama.html": "kotodama",
  "kaze-hichau.html": "kaze-hichau",
  "Kagagosai-puzzle.html": "kagagosai-puzzle",
  "Catan.html": "catan",
};
