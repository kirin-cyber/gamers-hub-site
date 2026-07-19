#!/usr/bin/env bash
#
# dev-tunnel.sh — GAMERS HUB のローカルサイトを SSH リバーストンネルで
# 公開サブドメインとして配信する開発用スクリプト。
#
# 使い方:
#   ./dev-tunnel.sh                # ポート8899で配信し、公開URLを表示
#   PORT=3000 ./dev-tunnel.sh      # ポートを変更
#   PROVIDER=serveo ./dev-tunnel.sh  # serveo.net を使う（既定は localhost.run）
#
# 停止: Ctrl+C（サーバー・トンネルとも自動で片付けます）
#
# ● 固定サブドメインにするには:
#   localhost.run … https://admin.localhost.run/ で自分のSSH公開鍵を登録すると、
#                    そのマシンからは毎回同じサブドメインになります（このスクリプトの変更不要）。
#   serveo.net    … 下の SUBDOMAIN 変数を設定すると `-R SUBDOMAIN:80:...` で希望名を要求します。
#
set -euo pipefail

# ---- 設定 ---------------------------------------------------------------
PORT="${PORT:-8899}"
PROVIDER="${PROVIDER:-localhost.run}"   # localhost.run | serveo
SUBDOMAIN="${SUBDOMAIN:-}"              # serveo で固定名を要求したいとき指定（例: gamershub）
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVE_LOG="$(mktemp -t gh-serve.XXXXXX)"
TUNNEL_LOG="$(mktemp -t gh-tunnel.XXXXXX)"

# ---- 後片付け -----------------------------------------------------------
SERVER_PID=""
SSH_PID=""
cleanup() {
  echo ""
  echo "🧹 停止中..."
  [ -n "$SSH_PID" ]    && kill "$SSH_PID"    2>/dev/null || true
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
  rm -f "$SERVE_LOG" "$TUNNEL_LOG" 2>/dev/null || true
  echo "✅ 終了しました"
}
trap cleanup EXIT INT TERM

# ---- 事前チェック -------------------------------------------------------
command -v python3 >/dev/null 2>&1 || { echo "❌ python3 が必要です"; exit 1; }
command -v ssh     >/dev/null 2>&1 || { echo "❌ ssh が必要です"; exit 1; }

# ---- ローカル静的サーバー起動 ------------------------------------------
echo "🖥  ローカルサーバー起動: http://localhost:${PORT}  (配信元: ${ROOT})"
python3 -m http.server "$PORT" --directory "$ROOT" >"$SERVE_LOG" 2>&1 &
SERVER_PID=$!
sleep 1

if ! curl -s -o /dev/null "http://localhost:${PORT}/index.html"; then
  echo "❌ ローカルサーバーの起動に失敗しました。ログ: $SERVE_LOG"
  exit 1
fi
echo "✅ ローカル疎通OK (index.html)"

# ---- SSH リバーストンネル起動 ------------------------------------------
echo "🌐 トンネル確立中... (provider=${PROVIDER})"
case "$PROVIDER" in
  serveo)
    REMOTE_HOST="serveo.net"
    if [ -n "$SUBDOMAIN" ]; then
      REMOTE_FWD="${SUBDOMAIN}:80:localhost:${PORT}"
    else
      REMOTE_FWD="80:localhost:${PORT}"
    fi
    SSH_USER=""
    ;;
  localhost.run|*)
    REMOTE_HOST="localhost.run"
    REMOTE_FWD="80:localhost:${PORT}"
    SSH_USER="nokey@"   # 鍵未登録でも匿名接続可。鍵を登録済みなら nokey@ を外すと固定サブドメイン
    [ -n "$(ls ~/.ssh/id_*.pub 2>/dev/null || true)" ] && SSH_USER=""
    ;;
esac

ssh -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30 -o ExitOnForwardFailure=yes \
    -R "$REMOTE_FWD" "${SSH_USER}${REMOTE_HOST}" 2>&1 | tee "$TUNNEL_LOG" &
SSH_PID=$!

# ---- 公開URLを抽出して表示 ---------------------------------------------
echo "⏳ 公開URLの発行を待機中..."
URL=""
for _ in $(seq 1 20); do
  URL="$(grep -oE 'https://[a-zA-Z0-9.-]+\.(lhr\.life|serveo\.net)' "$TUNNEL_LOG" 2>/dev/null | head -1 || true)"
  [ -n "$URL" ] && break
  sleep 1
done

echo ""
echo "==================================================================="
if [ -n "$URL" ]; then
  echo "🎮 GAMERS HUB 公開URL（相手に渡す）:"
  echo "   $URL"
else
  echo "⚠️  URLを自動抽出できませんでした。上のトンネルログを確認してください。"
fi
echo "   （このターミナルを開いている間だけ有効。Ctrl+Cで停止）"
echo "==================================================================="

# トンネルが生きている間フォアグラウンドで待機
wait "$SSH_PID"
