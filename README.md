nest x react Todo アプリ

## 本番（VM 202）

VM 202 の NixOS 設定は `~/.dotfiles/modules/nixos-host-web-server/default.nix` で管理する。Nginx は `/var/www/todo.tenelol.dev/current` の静的フロントを配信し、`/api/` をローカルの `todo-backend` systemd サービスへ転送する。DB は NixOS の MariaDB（`todo` ユーザーの Unix ソケット認証）で、Docker は使わない。Cloudflare 側の `todo.tenelol.dev` 公開ルートは Nix の管理外。

`main` への push で GitHub Actions がテスト・ビルドし、VM 202 の Todo 専用 runner が成果物を `/var/www/todo.tenelol.dev/releases/` と `/opt/nest-react-todo/releases/` に配置する。両方の `current` シンボリックリンクを切り替えて `todo-backend` を再起動し、ローカルの Nginx 経由で確認する。失敗時は直前のリリースへ戻す。PR はテスト・ビルドのみ。詳細は `.github/workflows/deploy.yml` と `scripts/deploy-vm202.sh`。VM 202 ではビルドせず、バックエンドの本番依存のみインストールする。起動前に TypeORM マイグレーションが実行される（DB マイグレーションの巻き戻しは自動化していない）。
