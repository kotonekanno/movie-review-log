<!-- omit in toc -->
# データ設計

v1.0.0  
DB migration: [V1_innitial_schema.sql](/backend/src/main/resources/db/migration/V1_initial_schema.sql)

<!-- omit in toc -->
### テーブル一覧

- [users](#users)
- [movies](#movies)
- [reviews](#reviews)
- [watchlist\_items](#watchlist_items)

## users

ユーザー情報

| カラム名       | 型           | 説明               |
| -------------- | ------------ | ------------------ |
| id             | SERIAL       | ユーザーID         |
| email          | VARCHAR(255) | メールアドレス     |
| password_hash  | VARCHAR(255) | パスワードのハッシュ値 |
| created_at     | TIMESTAMP    | アカウント作成日時 |
| deleted_at     | TIMESTAMP    | アカウント削除日時 |
| is_active      | BOOLEAN      | アカウントの有効性 |

- email
    - UNIQUE
- deleted_at
    - NULLでない場合は論理削除扱い
- is_active
    - DEFAULT FALSE
    - TRUEの場合のみログイン可能

## movies

外部APIキャッシュ

| カラム名       | 型           | 説明           |
| -------------- | ------------ | -------------- |
| id             | SERIAL       | 映画ID         |
| tmdb_id        | BIGINT       | TMDB内のID     |
| ja_title       | VARCHAR(255) | 日本語タイトル |
| original_title | VARCHAR(255) | 原題           |
| release_year   | INT          | 公開年         |
| poster_path    | VARCHAR(255) | ポスターURL    |

- tmdb_id
    - UNIQUE
- poster_path
    - [https://image.tmdb.org/t/p/w500/](https://image.tmdb.org/t/p/w500/) ＋ poster_path

## reviews

| カラム名   | 型           | 説明                 |
| ---------- | ------------ | -------------------- |
| id         | SERIAL       | レビューID           |
| user_id    | BIGINT       | ユーザーID           |
| movie_id   | BIGINT       | 映画ID               |
| score      | NUMERIC(2,1) | 点数                 |
| text       | TEXT         | レビュー本文         |
| watched_at | DATE         | 視聴日               |
| created_at | TIMESTAMP    | レビュー作成日時     |
| updated_at | TIMESTAMP    | レビュー最終更新日時 |
| deleted_at | TIMESTAMP    | レビュー削除日時     |

- user_id
    - FOREIGN: users.id(ONDELETE CASCADE)
- movie_id
    - FOREIGN: movie.id(ONDELETE SET NULL)
- score
    - 星5評価（0.0〜5.0）
- deleted_at
    - NULLでない場合は論理削除扱い

## watchlist_items

| カラム名   | 型        | 説明                   |
| ---------- | --------- | ---------------------- |
| id         | SERIAL    | ウォッチリストID       |
| user_id    | BIGINT    | ユーザーID             |
| movie_id   | BIGINT    | 映画ID                 |
| priority   | INT       | 優先度（%）            |
| note       | TEXT      | メモ                   |
| is_watched | BOOLEAN   | 視聴済みフラグ         |
| created_at | TIMESTAMP | ウォッチリスト追加日時 |

- user_id
    - FOREIGN: users.id(ONDELETE CASCADE)
- movie_id
    - FOREIGN: movie.id(ONDELETE SET NULL)
- priority
    - 0〜100の整数[%]
- is_watched
    - DEFAULT FALSE
    - TRUEならば視聴済み