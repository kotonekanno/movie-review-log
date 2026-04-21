<!-- omit in toc -->
# 映画記録アプリ

![preview](docs/images/review_list_page.png)

<!-- omit in toc -->
### 目次

- [概要](#概要)
- [デモ](#デモ)
- [使用技術](#使用技術)
- [各種ドキュメント](#各種ドキュメント)

## 概要

本アプリは、映画のレビューおよびウォッチリストをクラウド上で作成・管理できるWebアプリケーションです。  
ユーザーが、他者の評価に影響されることなく、自身の直観的な感想を蓄積できるようにすることを目的としています。

<!-- omit in toc -->
### ターゲット

- 映画の感想を記録・整理したい人
- 観たい映画をウォッチリストとして管理したい人

<!-- omit in toc -->
### 課題定義

- 他者の評価に影響されずに、自分の感想のみを蓄積したい
- 映画鑑賞時の直観的な感想を手軽に記録したい
- 観たい映画を効率的に管理したい


## デモ

- 🌐 https://movie-log-frontend.vercel.app/login
- [スクリーンショット](docs/screenshots.md)
- テストアカウント
    | メールアドレス | パスワード |
    | -------------- | ---------- |
    | test1@test.com | testtest   |
    | test2@test.com | testtest   |
    | test3@test.com | testtest   |

※ テスト用アカウントでのみ利用可能です  
※ 初回アクセス時に数秒かかる場合があります（Render無料プラン）


## 使用技術

<!-- omit in toc -->
### フロントエンド

- React / TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

<!-- omit in toc -->
### バックエンド

- Spring Boot / Java
- Gradle (Kotlin DSL)

<!-- omit in toc -->
### データベース

- PostgreSQL

<!-- omit in toc -->
### インフラ

- Render（Web service）: バックエンドのデプロイ先
- Neon: データベースのホスティング
- Vercel: フロントエンドのホスティング

<!-- omit in toc -->
### その他

- The Movie Database API: 映画情報の取得
- Flyway: データベースマイグレーションツール

## 各種ドキュメント

- [リリースノート](CHANGELOG.md): バージョンごとの変更点
- [開発予定](docs/issues.md): 今後開発予定の機能、改善予定など

<br>

- [機能一覧](docs/features.md)
- [API設計](docs/api-design.md)
- [データ設計](docs/db-design.md)
- [ディレクトリ構成](docs/directory-structure.md)