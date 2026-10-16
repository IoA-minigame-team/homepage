# MiniVerse ホームページ

IoAミニゲーム班「MiniVerse」のゲーム紹介サイトです。Next.js（静的書き出し）で作られていて、GitHub Pages で公開しています。

- 公開 URL: https://ioa-minigame-team.github.io/homepage/
- `main` に push すると GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルド・公開します

## 開発

```bash
npm install
npm run dev        # http://localhost:3000/homepage/
npm run build      # out/ に静的サイトを書き出し
npm run preview    # out/ を本番と同じ /homepage/ 付きで確認 → http://localhost:4173/homepage/
npm run lint
```

## ディレクトリ

| パス | 内容 |
|---|---|
| `src/data/games.ts` | **ゲーム一覧のデータ**（タイトル・説明・操作方法・スクショ・遊び方の設定など） |
| `src/data/members.ts` | メンバー紹介のデータ |
| `src/data/site.ts` | サイト全体の設定（チーム紹介文、お問い合わせ先、展示モードの秒数） |
| `src/app/` | ページ（トップ / ゲーム詳細 / プレイ画面 / メンバー） |
| `src/components/` | 共通部品 |
| `public/game/<slug>/` | Unity WebGL ビルド |
| `assets/images/` | 元画像（PNG/JPG）。`npm run images` で `public/images/` に WebP を書き出す |
| `public/*.html` | 旧サイトの URL から新ページへのリダイレクト |

## ゲームを追加する

1. **画像**：`assets/images/game/<slug>/` に正方形のサムネイルとスクリーンショット（16:9 推奨）を置き、`npm run images` を実行
2. **ビルド**：Unity の WebGL ビルド一式（`index.html`・`Build/`・`TemplateData/`）を `public/game/<slug>/` に置く
   - フォルダ名・ファイル名は**半角英数字とハイフン**にしてください（スペースや日本語は URL で問題が出ます）
3. **データ**：`src/data/games.ts` の `games` に 1 件追加（先頭に置くと一覧の先頭に出ます。`isNew: true` で NEW バッジ）

```ts
play: { type: "embed", src: "/game/<slug>/index.html" },                       // サイト内で遊ぶ
play: { type: "external", url: "https://unityroom.com/games/xxx", label: "unityroom" }, // 外部サイトへ
```

`play` を書き換えるだけで「サイト内で遊ぶ」⇔「unityroom などへリンク」を切り替えられます。

### Unity ビルドについての注意

- **圧縮形式**：GitHub Pages は Brotli/Gzip 圧縮ファイルに `Content-Encoding` を付けないため、Unity の圧縮ビルドはそのままだと読み込めません。
  - おすすめ：Player Settings > Publishing Settings で **Compression Format = Disabled** にしてビルド
  - Brotli（`.br`）でビルドした場合も、`npm run dev` / `build` 時に `scripts/prepare-unity.mjs` が自動で展開します。その場合は `index.html` の `dataUrl` などを `.br` を外した名前に書き換えてください（`public/game/catan/index.html` が例）
- **見た目の調整は不要**：プレイ画面が iframe 内の Unity 標準テンプレートに CSS を注入して枠いっぱいに広げるので、再ビルドしてもそのまま置き換えるだけで OK です
- 1 ファイル 100MB を超えると GitHub に push できません

## 展示（キオスク）モード

イベントで PC やタブレットに置いておくためのモードです。

- **ON**：`https://ioa-minigame-team.github.io/homepage/?kiosk=1` を開く（ブラウザに記憶されるので、以降は普通にトップを開くだけで OK）
- **OFF**：`?kiosk=0` を付けて開く、または **左上のロゴを 3 秒長押し**
- ON の間は：
  - お問い合わせ・SNS シェア・外部リンクを非表示、右クリックとテキスト選択を無効化
  - 最初のタップで全画面化
  - プレイ画面に「ホームへ」ボタンを常時表示
  - 放置すると「まだ遊ぶ？」のカウントダウンが出て、トップに戻る（ゲーム中のキー・マウス・タッチ操作も検知します）
  - トップで放置するとゲーム紹介のスライドショー（アトラクトモード）
- 秒数は `src/data/site.ts` の `kiosk` で変更できます
- unityroom など外部サイトのゲームは、移動すると放置検知や「ホームへ」ボタンが効かなくなります（移動前に確認画面を出しています）。展示で使うゲームはできるだけ `embed` にしてください
