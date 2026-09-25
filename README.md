nest x react Todo アプリ

## Production deployment (PVE VM 102)

`main` の push は GitHub Actions でテストし、リポジトリ変数 `DEPLOY_ENABLED=true` のときだけ本番へ自動デプロイします。GitHub-hosted runner が Tailscale 経由で VM に接続し、`scripts/deploy-production.sh` が DB ダンプを `/home/debian/todo-db-backups/` に保存・検証してから Compose を更新します。失敗した migration の自動 rollback は行いません。バックアップは同じ VM 上なので、ホスト障害への備えには別途オフホストのバックアップが必要です。

初回設定（認証値はこのリポジトリやチャットに記載しない）:

1. VM 102 (`nest-react-todo`) の `sudo tailscale status` に表示されるログイン URL を開き、PVE と同じ Tailnet へ参加させる。`--accept-dns=false` で起動済み。Tailnet 管理画面でこの VM のキー期限と `tag:ci` から VM の TCP/22 へのアクセス規則を確認する。
2. Tailnet の [Trust credentials](https://console.tailscale.com/admin/settings/trust-credentials) から OAuth client を作り、`auth_keys` の Write 権限と `tag:ci` を指定する。必要なら Tailnet policy の `tagOwners` に `tag:ci` を定義する。GitHub リポジトリの `production` environment Secrets に `TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET` を登録する。
3. 同じ environment の Secret `DEPLOY_SSH_KEY`（VM の `debian` に限定したデプロイ鍵）と変数 `DEPLOY_HOST_KEY`（VM の SSH 公開ホスト鍵）は設定済み。VM の Tailscale IPv4 アドレスを environment 変数 `DEPLOY_HOST` に登録する。秘密鍵は手元の `~/.ssh/id_ed25519_todo_deploy` にも保存されている。
4. Tailnet 参加後、専用鍵で VM へ SSH 接続できることを確認する。リポジトリ変数 `DEPLOY_ENABLED=true` を設定すると、`main` への次の push または `workflow_dispatch`（main 指定）でデプロイする。Actions の `ci` と `deploy` が成功したことを確認し、失敗時は `DEPLOY_ENABLED=false` に戻す。

本番 VM の `/opt/nest-react-todo/.env.production` と Compose の `nest-react-todo_mysql-data` volume は同期や更新で削除しません。自動デプロイは短時間のサービス再作成を伴います。開発環境は `backend/docker-compose.yml` の別 MySQL と Vite (`fronted/pnpm dev`) を使います。
