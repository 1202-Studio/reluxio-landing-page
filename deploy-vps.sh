#!/usr/bin/env bash
# Redeploy the Reluxio landing page to the Hostinger VPS (72.60.234.148)
# over SSH alias "reluxio-vps". Serves landing.reluxio.binhnt.tech via the
# "reluxio-landing" systemd unit on port 3001 (main app owns 3000).
# Usage: ./deploy-vps.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Syncing source to VPS..."
rsync -az --delete \
  --exclude '.git' --exclude 'node_modules' --exclude '.next' \
  --exclude 'tsconfig.tsbuildinfo' --exclude '.claude' \
  --exclude '.env' --exclude '.env.local' --exclude '.DS_Store' \
  ./ reluxio-vps:/var/www/reluxio-landing/

echo "==> Installing deps + building on VPS..."
ssh reluxio-vps 'cd /var/www/reluxio-landing \
  && npm install --include=dev --no-audit --no-fund \
  && npm run build \
  && chown -R www-data:www-data /var/www/reluxio-landing \
  && systemctl restart reluxio-landing \
  && sleep 3 && systemctl is-active reluxio-landing \
  && curl -s -o /dev/null -w "local app: HTTP %{http_code}\n" http://127.0.0.1:3001/'

echo "==> Done. https://landing.reluxio.binhnt.tech"
