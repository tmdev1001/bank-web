#!/usr/bin/env bash
# Audit every route at every QA width. Rebuilds first: on Windows a running
# server holds .next open, and building underneath it yields chunks it cannot
# serve — which renders an unstyled page and a meaningless pass.
cd "$(dirname "$0")/.."
bash .audit/cycle.sh >/dev/null || { echo "build/serve failed"; exit 1; }
fail=0
for r in "" personal business family travel invest invest/alpha global-dollar ventures resources company pricing plus login signup; do
  if AUDIT_ROUTE="$r" node .audit/check.mjs 2>&1 | grep -q "ALL CHECKS PASSED"; then
    printf "  PASS  /%s\n" "$r"
  else
    printf "  FAIL  /%s\n" "$r"
    AUDIT_ROUTE="$r" node .audit/check.mjs 2>&1 | grep "FAIL" | sed 's/^/        /'
    fail=1
  fi
done
exit $fail
