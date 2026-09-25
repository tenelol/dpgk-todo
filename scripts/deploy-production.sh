#!/usr/bin/env bash
set -euo pipefail

cd /opt/nest-react-todo
test -s .env.production
compose=(docker compose -p nest-react-todo --env-file .env.production -f compose.production.yml --profile tunnel)

umask 077
mkdir -p /home/debian/todo-db-backups
backup="/home/debian/todo-db-backups/todo-$(date -u +%Y%m%dT%H%M%SZ).sql.gz"
partial="${backup}.partial"
trap 'rm -f "$partial"' EXIT
"${compose[@]}" exec -T db sh -c 'exec mysqldump --single-transaction --quick --no-tablespaces -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' </dev/null | gzip > "$partial"
gzip -t "$partial"
test -s "$partial"
mv "$partial" "$backup"
trap - EXIT
printf 'Database backup: %s\n' "$backup"

"${compose[@]}" build --quiet backend migrate web
"${compose[@]}" up -d --no-build --wait
"${compose[@]}" exec -T web wget -qO /dev/null http://127.0.0.1/ </dev/null
"${compose[@]}" exec -T web wget -qO /dev/null http://127.0.0.1/api/todo </dev/null
printf 'Production web and API checks passed\n'
