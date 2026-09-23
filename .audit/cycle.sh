#!/usr/bin/env bash
# Rebuild and re-serve reliably on Windows: the dev server holds .next open,
# so building underneath it produces chunks the running server cannot serve.
set -e
cd "$(dirname "$0")/.."
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3210 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { taskkill /PID \$_ /T /F }" >/dev/null 2>&1 || true
sleep 3
rm -rf .next
npm run build 2>&1 | tail -3
nohup npx next start -p 3210 > /tmp/bankweb.log 2>&1 &
sleep 22
CSS=$(curl -s -m 20 http://127.0.0.1:3210/ | grep -oE '/_next/static/[^"]*\.css' | head -1)
CODE=$(curl -s -m 20 -o /dev/null -w "%{http_code}" "http://127.0.0.1:3210$CSS")
echo "stylesheet $CSS -> HTTP $CODE"
[ "$CODE" = "200" ] || { echo "ABORT: stylesheet not served; audit would be meaningless"; exit 1; }
