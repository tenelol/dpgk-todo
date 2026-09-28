nest x react Todo アプリ

## 本番（VM 202）

VM 202 の NixOS 設定は `~/.dotfiles/modules/nixos-host-web-server/default.nix` で管理する。Nginx は `/var/www/todo.tenelol.dev/current` の静的フロントを配信し、`/api/` をローカルの `todo-backend` systemd サービスへ転送する。DB は NixOS の MariaDB（`todo` ユーザーの Unix ソケット認証）で、Docker は使わない。Cloudflare 側の `todo.tenelol.dev` 公開ルートは Nix の管理外。

更新時は `fronted` と `backend` でそれぞれ `pnpm build` し、フロントの `dist/` を上記 `current/` に、バックエンドの `dist/`・`package.json`・`pnpm-lock.yaml` を `/opt/nest-react-todo/backend/` に配置する。VM 202 で `cd /opt/nest-react-todo/backend && pnpm install --prod --frozen-lockfile` を実行し、`sudo systemctl restart todo-backend` で反映する。起動前に TypeORM マイグレーションが実行される。
