# GAMERS HUB — サイト開発環境

> GAMERS HUB | 本音を言える場所をつくる

## 新コーポレートサイトの編集について

- リポジトリ直下の`index.html`、`assets/`、`images/`、`gh-one/`はVercelで公開する生成済みファイルです。
- [`source/`](source/)にReact / Next.jsの編集可能なソースと再ビルド手順が入っています。
- 新しいサイトを編集する場合は、まず[`source/README.md`](source/README.md)を参照してください。

静的HTML（ビルド不要）のWebサイトです。このREADMEは、開発環境を引き継ぐ方向けに **SSHでのリポジトリ取得 → ローカル起動** までの手順をまとめたものです。

---

## 1. 前提

- Git がインストール済みであること（`git --version` で確認）
- ローカルプレビュー用に Python 3（`python3 --version`）または任意の静的サーバー
- ビルドツール・Node.js・npm は **不要**（プレーンなHTML/CSS/JS）

---

## 2. アクセス設定（初回のみ）

このリポジトリは GitHub 上にあり、現在 **Public（公開）** です。
- **閲覧・クローンだけ**なら、SSH鍵の設定は不要です（下の HTTPS clone がすぐ使えます）。
- **変更を push（共同編集）** するには、オーナーからの **コラボレーター招待を承諾**し、
  SSH鍵の登録（下記）または HTTPS + 認証が必要です。

**リポジトリ（SSH）:** `git@github.com:kirin-cyber/gamers-hub-site.git`
**リポジトリ（HTTPS）:** `https://github.com/kirin-cyber/gamers-hub-site.git`

### 2-1. SSH鍵を用意する
すでに鍵がある場合はスキップ可。無い場合は作成します。

```bash
# 既存鍵の確認
ls ~/.ssh/id_ed25519.pub

# 無ければ作成（メールは自分のGitHub登録アドレスに）
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### 2-2. 公開鍵を GitHub に登録する
```bash
cat ~/.ssh/id_ed25519.pub   # 表示された内容をコピー
```
GitHub → Settings → **SSH and GPG keys** → **New SSH key** に貼り付けて保存。

### 2-3. コラボレーター招待を承諾する（push する人のみ）
共同編集（push）するには、オーナー（kirin-cyber）からのコラボレーター招待を承諾します。
GitHubの **通知（ベルアイコン）またはメール**、もしくは
`https://github.com/kirin-cyber/gamers-hub-site/invitations` を開いて **「Accept invitation」**。

### 2-4. 接続テスト
```bash
ssh -T git@github.com
# → "Hi <ユーザー名>! You've successfully authenticated..." が出ればOK
```

---

## 3. クローン

```bash
# SSH（鍵を登録済みの場合。push もこちら推奨）
git clone git@github.com:kirin-cyber/gamers-hub-site.git

# または HTTPS（鍵不要。閲覧・お試しに手軽）
git clone https://github.com/kirin-cyber/gamers-hub-site.git

cd gamers-hub-site
```

---

## 4. ローカルで起動（プレビュー）

ビルド不要なので、静的サーバーで配信するだけです。

```bash
# 方法A: Python標準の簡易サーバー
python3 -m http.server 8899
# → ブラウザで http://localhost:8899/index.html
```

```bash
# 方法B: ファイルを直接開く（最も手軽）
open index.html        # macOS
```

> 一部の相対パス・fetch等はローカルサーバー経由（方法A）でないと動かない場合があるため、
> 開発時は方法Aを推奨します。

---

## 5. ページ構成

| ファイル | 内容 |
|---|---|
| `index.html` | トップページ（GAMERS HUB本体） |
| `anone.html` | Anone サービスのLP |
| `gamershub_modified.html` | GAMERS HUB 編集用の派生版 |
| `jigyou_gaiyosho.html` | 事業概要書 |

---

## 6. 開発フロー（Git）

```bash
git checkout -b feature/変更内容   # 作業ブランチを切る
# ...編集...
git add -A
git commit -m "変更内容の説明"
git push -u origin feature/変更内容
# GitHub上でPull Requestを作成 → レビュー → main へマージ
```

- `main` へ直接pushせず、ブランチ＋Pull Request 運用を推奨します。
- コミットメッセージは「何を・なぜ変えたか」が分かるように書いてください。

---

## 7. 相手にサイトを見せる（SSHトンネルで公開サブドメイン発行）

ローカルで動かしているサイトを、そのまま公開URL（サブドメイン）として一時的に共有できます。
デプロイ不要・アカウント不要（匿名）で、SSHリバーストンネルを使います。

```bash
./dev-tunnel.sh
# → http://localhost:8899 で配信しつつ、公開URLを自動表示:
#   🎮 GAMERS HUB 公開URL: https://xxxxxxxx.lhr.life
# 停止は Ctrl+C（サーバー・トンネルとも自動で片付け）
```

オプション:

```bash
PORT=3000 ./dev-tunnel.sh          # 配信ポートを変更
PROVIDER=serveo ./dev-tunnel.sh    # serveo.net を使う（既定は localhost.run）
SUBDOMAIN=gamershub PROVIDER=serveo ./dev-tunnel.sh   # serveoで希望サブドメイン名を要求
```

### 固定サブドメインにしたい場合（毎回同じURL）
匿名接続だとURLは接続ごとに変わります。固定したいときは:

- **localhost.run** … [admin.localhost.run](https://admin.localhost.run/) で**自分のSSH公開鍵を登録**すると、
  そのマシンからは毎回同じサブドメインになります（`dev-tunnel.sh` はそのまま利用可）。
- **serveo.net** … `SUBDOMAIN=希望名 PROVIDER=serveo ./dev-tunnel.sh` で希望名を要求できます（空きがあれば）。

> ⚠️ この方式は「開発中のプレビュー共有」用です。恒久公開・本番配信には
> GitHub Pages / Netlify / Cloudflare Pages などの静的ホスティングを使ってください。

---

## 8. 困ったとき

- `Permission denied (publickey)` … SSH鍵がGitHubに未登録、または招待未承諾。手順2を再確認。
- ページが崩れる／画像が出ない … `open` ではなくローカルサーバー（手順4-A）で確認。
- push で `403 / permission denied` … コラボレーター招待の承諾がまだ、または権限不足。手順2-3を確認。
- 招待が見つからない … `https://github.com/kirin-cyber/gamers-hub-site/invitations` を開く。

---

## 9. サイトを更新する方法（本番反映まで）

### 更新の仕組み

```
ローカルで編集 → GitHubへ push → Vercelが自動ビルド → www.gamershub.jp に反映
```

**サーバーにSSHで入る作業はありません。** GitHubにpushするだけで本番が更新されます（反映まで数十秒）。
Vercelのアカウントは不要です。GitHubのアクセス権だけあれば更新できます。

### 触るファイル

| ファイル | 反映先 |
|---|---|
| `index.html` | トップページ（会社サイト本体） |
| `anone.html` | あのね／ANONE のLP |
| `jigyou_gaiyosho.html` | 事業概要書 |

### 手順（推奨：ブランチ＋プルリクエスト）

```bash
# 1. 最新を取得
git checkout main
git pull origin main

# 2. 作業ブランチを作る（main を直接触らない）
git checkout -b fix/トップの文言修正

# 3. 編集したら、ローカルで見た目を確認
python3 -m http.server 8899
#   → ブラウザで http://localhost:8899/index.html

# 4. コミットして push
git add -A
git commit -m "トップページの見出しを修正"
git push -u origin fix/トップの文言修正
```

5. GitHub上で **Pull Request** を作成する
6. **Vercelが自動でプレビューURLを作る**（本番とは別のURL）。そこで実際の表示を確認できる
7. 問題なければ **Merge** → main に入った瞬間に本番へ自動反映

### 反映されたかの確認

```bash
curl -sI https://www.gamershub.jp | head -1     # 200 が返るか
curl -s https://www.gamershub.jp | grep "変更した文字列"   # 変更が乗っているか
```

反映が遅いと感じたら、ブラウザのスーパーリロード（Cmd/Ctrl + Shift + R）で確認する。

### ⚠️ やらないこと

- **`main` へ直接 push しない。** 本番が即座に書き換わり、確認の機会がありません
- 会社情報（社名・所在地・代表者名・資本金）は**登記内容と一致**させる必要があります。銀行審査等で参照されるため、変更する場合は必ず事前に共有してください
- 「検閲されない」「誰も消せない」等の表現は、**銀行審査の都合で意図的に削除済み**です。復活させないでください

### 元に戻したいとき

```bash
git revert <戻したいコミットのハッシュ>
git push origin main
```
Vercelの管理画面からは、過去のデプロイを選んで即座にロールバックすることもできます（オーナー側の操作）。
