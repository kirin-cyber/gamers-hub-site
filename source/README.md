# GAMERS HUB 編集用ソース

このディレクトリには、GAMERS HUBコーポレートサイトの編集可能なReact / Next.jsソースが入っています。
リポジトリ直下の`index.html`、`assets/`、`images/`、`gh-one/`は、Vercelでそのまま公開するための生成済みファイルです。

## 必要な環境

- Node.js 22.13.0以上
- npm 10以上

## 編集と確認

```bash
cd source
npm ci
npm run dev
```

ブラウザで`http://localhost:3000`を開きます。

主な編集箇所：

- `app/page.tsx`：トップページの内容
- `app/globals.css`：全体デザインとスマートフォン対応
- `app/layout.tsx`：SEO・SNS共有情報
- `app/ContactForm.tsx`：お問い合わせフォーム
- `app/gh-one/`：GH ONEのCOMING SOONページ
- `public/images/`：ロゴと店舗写真

## 公開用ファイルを更新

```bash
cd source
npm ci
npm run publish:root
```

`publish:root`はNext.jsの静的ファイルを生成し、リポジトリ直下へコピーします。既存の`anone.html`、`jigyou_gaiyosho.html`などの旧ページは削除しません。

生成後はリポジトリ直下へ移動し、差分を確認してからコミットしてください。

```bash
cd ..
git status
git diff --stat
```

## 公開対象外

GH ONEの詳細機能と操作デモは未公開です。このソースにはCOMING SOONページのみを含めています。
