<!-- omit in toc -->
# データ設計

DB name: `movie_review_app` / `movie_review_app_dev`

<!-- omit in toc -->
### テーブル一覧

- [users](#users)
- [movies](#movies)
- [movie\_genres](#movie_genres)
- [genres](#genres)
- [reviews](#reviews)
- [watchlist\_items](#watchlist_items)


## users

| カラム名          | 型            | NULL      | 制約         | デフォルト        | 説明                |
| ----------------- | ------------- | --------- | ------------ | ----------------- | ------------------- |
| id                | bigint        | NOT NULL  | PRIMARY KEY  |                   | ユーザーID          |
| email             | varchar(255)  | NOT NULL  | UNIQUE KEY   |                   | メールアドレス      |
| password_hash     | varchar(255)  | NOT NULL  |              |                   | パスワードハッシュ  |
| created_at        | timestamp     | NOT NULL  |              |                   | 登録日時            |
| deleted_at        | timestamp     | NULL      |              |                   | 削除日時            |

## movies

外部APIキャッシュ

| カラム名          | 型            | NULL      | 制約         | デフォルト        | 説明                |
| ----------------- | ------------- | --------- | ------------ | ----------------- | ------------------- |
| id                | bigint        | NOT NULL  | PRIMARY KEY  |                   | ユーザーID          |
| external_id       | Integer       | NOT NULL  |              |                   | 登録日時            |
| ja_title          | varchar(255)  | NULL      |              |                   | ユーザーID          |
| country           | varchar(255)  | NULL      | PRIMARY KEY  |                   | ユーザーID          |
| deleted_at        | timestamp     | NULL      |              |                   | 削除日時            |
| email             | varchar(255)  | NOT NULL  | UNIQUE KEY   |                   | メールアドレス      |
| password_hash     | varchar(255)  | NOT NULL  |              |                   | パスワードハッシュ  |

## movie_genres

## genres

## reviews

## watchlist_items