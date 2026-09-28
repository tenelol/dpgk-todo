#!/usr/bin/env bash
set -euo pipefail

site="${1:?artifact directory required}"
web=/var/www/todo.tenelol.dev
api=/opt/nest-react-todo
release="${GITHUB_RUN_ID:?}-${GITHUB_RUN_ATTEMPT:?}"
test -L "$web/current" && test -L "$api/current"
test -f "$site/fronted/dist/index.html"
test -f "$site/backend/dist/main.js"
test -f "$site/backend/pnpm-lock.yaml"

mkdir -p "$web/releases/$release" "$api/releases/$release"
rsync -a "$site/fronted/dist/" "$web/releases/$release/"
rsync -a "$site/backend/dist/" "$api/releases/$release/dist/"
cp "$site/backend/package.json" "$site/backend/pnpm-lock.yaml" "$api/releases/$release/"
(cd "$api/releases/$release" && pnpm install --prod --frozen-lockfile)

old_web=$(readlink "$web/current")
old_api=$(readlink "$api/current")
rollback() {
  ln -sfn "$old_web" "$web/.current-rollback" && mv -Tf "$web/.current-rollback" "$web/current"
  ln -sfn "$old_api" "$api/.current-rollback" && mv -Tf "$api/.current-rollback" "$api/current"
  /run/wrappers/bin/sudo -n /run/current-system/sw/bin/systemctl restart todo-backend.service
}
trap rollback ERR
ln -sfn "releases/$release" "$web/.current-next"
mv -Tf "$web/.current-next" "$web/current"
ln -sfn "releases/$release" "$api/.current-next"
mv -Tf "$api/.current-next" "$api/current"
/run/wrappers/bin/sudo -n /run/current-system/sw/bin/systemctl restart todo-backend.service
curl -fsS --retry 8 --retry-delay 1 --retry-connrefused -H 'Host: todo.tenelol.dev' http://127.0.0.1/api/todo >/dev/null
curl -fsS -H 'Host: todo.tenelol.dev' http://127.0.0.1/ >/dev/null
trap - ERR
