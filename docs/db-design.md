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

ユーザー情報

| カラム名          | 型            | NULL      | 制約         | 説明                |
| ----------------- | ------------- | --------- | ------------ | ------------------- |
| id                | bigint        | NOT NULL  | PRIMARY KEY  | ユーザーID          |
| email             | varchar(255)  | NOT NULL  | UNIQUE KEY   | メールアドレス      |
| password_hash     | varchar(255)  | NOT NULL  |              | パスワードハッシュ  |
| created_at        | timestamp     | NOT NULL  |              | 登録日時            |
| deleted_at        | timestamp     | NULL      |              | 削除日時            |

## movies

外部APIキャッシュ

| カラム名          | 型            | NULL      | 制約         | 説明                |
| ----------------- | ------------- | --------- | ------------ | ------------------- |
| id                | bigint        | NOT NULL  | PRIMARY KEY  |                     |
| tmdb_id           | bigint        | NULL      | UNIQUE KEY   | TMDB内のID          |
| ja_title          | varchar(255)  | NULL      |              | 日本語タイトル      |
| original_title    | varchar(255)  | NOT NULL  |              | 原題                |
| release_year      | int           | NULL      |              | 公開年              |
| poster_path       | varchar(255)  | NULL      |              | ポスターのURL       |

## movie_genres

## genres

## reviews

| カラム名          | 型            | NULL      | 制約                    | 説明                 |
| ----------------- | ------------- | --------- | ----------------------- | -------------------- |
| id                | bigint        | NOT NULL  | PRIMARY KEY             |                      |
| user_id           | bitint        | NOT NULL  | REFERENCES user(id)     | ユーザーID           |
| tmdb_id           | bigint        | NOT NULL  | REFERENCES movie(id)    | TMDB内のID           |
| score             | double        | NOT NULL  | CHECK(0 < score < 5)    | 点数（0.0-5.0）      |
| text              | varchar(255)  | NULL      |                         | レビュー             |
| watched_at        | date          | NULL      |                         | 視聴日               |
| created_at        | timestamp     | NULL      |                         | レビュー作成日時     |
| updated_at        | timestamp     | NULL      |                         | レビュー最終更新日時 |
| deleted_at        | timestamp     | NULL      |                         | レビュー削除日時     |

## watchlist_items

| カラム名          | 型            | NULL      | 制約                       | 説明                 |
| ----------------- | ------------- | --------- | -------------------------- | -------------------- |
| id                | bigint        | NOT NULL  | PRIMARY KEY                |                      |
| user_id           | bitint        | NOT NULL  | REFERENCES user(id)        | ユーザーID           |
| tmdb_id           | bigint        | NOT NULL  | REFERENCES movie(id)       | TMDB内のID           |
| priority          | int           | NOT NULL  | CHECK(0 < priority < 100)  | 優先度（%）          |
| note              | varchar(255)  | NULL      |                            | メモ                 |
| is_watched        | boolean       | NOT NULL  |                            | 視聴済みならばtrue   |
| created_at        | timestamp     | NULL      |                            | 作成日時             |
| deleted_at        | timestamp     | NULL      |                            | 削除日時             |