<!-- omit in toc -->
# API設計

<!-- omit in toc -->
### 一覧

- [認証](#認証)
  - [POST /register](#post-register)
  - [POST /login](#post-login)
  - [POST /logout](#post-logout)
- [映画](#映画)
  - [GET /movies](#get-movies)
  - [GET /movies/{tmdb\_id}](#get-moviestmdb_id)
- [レビュー](#レビュー)
  - [POST /reviews](#post-reviews)
  - [GET /reviews](#get-reviews)
  - [GET /reviews/{review\_id}](#get-reviewsreview_id)
  - [PATCH /reviews/{review\_id}](#patch-reviewsreview_id)
  - [DELETE /reviews/{review\_id}](#delete-reviewsreview_id)
- [ウォッチリスト](#ウォッチリスト)
  - [POST /watchlist](#post-watchlist)
  - [GET /watchlist](#get-watchlist)
  - [PATCH /watchlist/{watchlist\_id}](#patch-watchlistwatchlist_id)
  - [PATCH /watchlist](#patch-watchlist)
  - [DELETE /watchlist/{watchlist\_id}](#delete-watchlistwatchlist_id)
  - [DELETE /watchlist](#delete-watchlist)
- [外部API: The Movie Database API](#外部api-the-movie-database-api)
  - [検索](#検索)
  - [詳細取得](#詳細取得)

## 認証

### POST /register

ユーザー登録

<!-- omit in toc -->
#### Request

`application/x-www-form-urlencoded`

| name     | type   | required | description |
|----------|--------|----------|-------------|
| email    | string | yes      | メールアドレス |
| password | string | yes      | パスワード |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
#### 204 Created

```JSON
{
  "userId": 1
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| userId        | String  | ユーザーID          |

### POST /login

ユーザー認証（Spring Security）

<!-- omit in toc -->
#### Request

`application/x-www-form-urlencoded`

| name     | type   | required | description |
|----------|--------|----------|-------------|
| email    | string | yes      | メールアドレス |
| password | string | yes      | パスワード |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

### POST /logout

ログアウト（Spring Security）

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 204 No Content


## 映画

### GET /movies

映画をTMDBでタイトル検索し、20件取得する

<!-- omit in toc -->
#### クエリパラメータ

| name  | type   | required | description |
|-------|--------|----------|-------------|
| query | string | yes      | 検索キーワード |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "results": [
    {
      "tmdbId": 123,
      "jaTitle": "スター・ウォーズ",
      "originalTitle": "Star Wars",
      "posterPath": "/xxx.jpg"
    }
  ]
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| results       | Array   |                     |
| jaTitle       | String  | 日本語タイトル      |
| originalTitle | String  | 原題                |
| posterPath    | String  | ポスター画像のパス  |

### GET /movies/{tmdb_id}

映画の詳細情報をTMDBから取得する

<!-- omit in toc -->
#### パスパラメータ

| name    | type   | description |
|---------|--------|-------------|
| tmdb_id | string | TMDB内の映画ID |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "movieId": 123,
  "jaTitle": "スター・ウォーズ",
  "originalTitle": "Star Wars",
  "releaseYear": 1977,
  "posterPath": "/xxx.jpg"
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| movieId       | Number  | DB上の映画ID        |
| jaTitle       | String  | 日本語タイトル      |
| originalTitle | String  | 原題                |
| releaseYear   | Number  | 公開年              |
| posterPath    | String  | ポスター画像のパス  |


## レビュー

### POST /reviews

レビュー作成

<!-- omit in toc -->
#### Request

```JSON
{
  "movieId": 123,
  "text": "面白かった",
  "score": 4.8,
  "watchedAt": "2026-01-01"
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| movieId       | Number  | DB上の映画ID        |
| text          | String  | 感想文              |
| score         | Number  | 点数（0.0-5.0）     |
| watchedAt     | String  | 視聴日              |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 201 Created

```JSON
{
  "reviewId": 123
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| reviewId      | Number  | レビューID          |

### GET /reviews

レビュー一覧取得

<!-- omit in toc -->
#### クエリパラメータ

| name  | type   | required | description |
|-------|--------|----------|-------------|
| page  | int    | yes      | ページ数 |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "reviews": [
    {
      "reviewId": 123,
      "title": String,
      "posterPath": String,
      "score": Double
    }
  ]
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| reviews       | Array   |                     |
| reviewId      | Number  | レビューID          |
| title         | String  | 日本語タイトル      |
| posterPath    | String  | ポスター画像のパス  |
| score         | Number  | 点数（0.0-5.0）     |

### GET /reviews/{review_id}

レビューの詳細取得

<!-- omit in toc -->
#### パスパラメータ

| name       | type   | description |
|------------|--------|-------------|
| review_id  | int    | レビューID |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "jaTitle": "スター・ウォーズ",
  "originalTitle": "Star Wars",
  "releaseYear": 1997,
  "posterPath": "/xxx.jpg",
  "score": 5.0,
  "text": "最高だった",
  "watchedAt": "2026-01-01"
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| jaTitle       | String  | 日本語タイトル      |
| originalTitle | String  | 原題                |
| releaseYear   | Number  | 公開年              |
| posterPath    | String  | ポスター画像のパス  |
| score         | Number  | 点数（0.0-5.0）     |
| text          | String  | 感想文              |
| watchedAt     | String  | 視聴日              |

### PATCH /reviews/{review_id}

レビュー更新

<!-- omit in toc -->
#### パスパラメータ

| name       | type   | description |
|------------|--------|-------------|
| review_id  | int    | レビューID |

<!-- omit in toc -->
#### Request

```JSON
{
  "movieId": 123,
  "text": "面白かった",
  "score": 4.8,
  "watchedAt": "2026-01-01"
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| movieId       | Number  | DB上の映画ID        |
| text          | String  | 感想文              |
| score         | Number  | 点数（0.0-5.0）     |
| watchedAt     | String  | 視聴日              |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "jaTitle": "スター・ウォーズ",
  "originalTitle": "Star Wars",
  "releaseYear": 1997,
  "posterPath": "/xxx.jpg",
  "score": 5.0,
  "text": "最高だった",
  "watchedAt": "2026-01-01"
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| jaTitle       | String  | 日本語タイトル      |
| originalTitle | String  | 原題                |
| releaseYear   | Number  | 公開年              |
| posterPath    | String  | ポスター画像のパス  |
| score         | Number  | 点数（0.0-5.0）     |
| text          | String  | 感想文              |
| watchedAt     | String  | 視聴日              |

### DELETE /reviews/{review_id}

レビュー削除

<!-- omit in toc -->
#### パスパラメータ

| name       | type   | description |
|------------|--------|-------------|
| review_id  | int    | レビューID |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 204 No Content


## ウォッチリスト

### POST /watchlist

ウォッチリスト追加

<!-- omit in toc -->
#### Request

```JSON
{
  "movidId": 123,
  "note": "面白そう",
  "priority": 88
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| movieId       | Number  | DB上の映画ID        |
| note          | String  | メモ                |
| priority      | Number  | 優先度 [%]          |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 201 Created

```JSON
{
  "watchlistId": 123
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| watchlistId   | Number  | ウォッチリストID    |

### GET /watchlist

ウォッチリスト取得

<!-- omit in toc -->
#### クエリパラメータ

| name  | type   | required | description |
|-------|--------|----------|-------------|
| page  | int    | yes      | ページ数 |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "results": [
    {
      "watchlistId": 123,
      "jaTitle": "スター・ウォーズ",
      "originalTitle": "Star Wars",
      "posterPath": "/xxx.jpg",
      "isWatched": true,
      "priority": 90,
      "note": "見たい"
    }
  ]
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| results       | Array   |                     |
| watchlistId   | Number  | ウォッチリストID    |
| jaTitle       | String  | 日本語タイトル      |
| originalTitle | String  | 原題                |
| posterPath    | String  | ポスター画像のパス  |
| isWatched     | Boolean | 視聴済みならばtrue  |
| priority      | Number  | 優先度 [%]          |
| note          | String  | メモ                |

### PATCH /watchlist/{watchlist_id}

ウォッチリストアイテム編集

<!-- omit in toc -->
#### パスパラメータ

| name          | type   | description |
|---------------|--------|-------------|
| watchlist_id  | int    | ウォッチリストID |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "watchlistId": 123,
  "jaTitle": "スター・ウォーズ",
  "originalTitle": "Star Wars",
  "posterPath": "/xxx.jpg",
  "priority": 90,
  "note": "見たい"
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| watchlistId   | Number  | ウォッチリストID    |
| jaTitle       | String  | 日本語タイトル      |
| originalTitle | String  | 原題                |
| posterPath    | String  | ポスター画像のパス  |
| priority      | Number  | 優先度 [%]          |
| note          | String  | メモ                |

### PATCH /watchlist

ウォッチリスト視聴済みフラグ変更

<!-- omit in toc -->
#### Request

```JSON
{
  "watchlistId": 123,
  "isWatched": true
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| watchlistId   | Number  | ウォッチリストID    |
| isWatched     | Boolean | 視聴済みならばtrue  |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 204 No Content

### DELETE /watchlist/{watchlist_id}

ウォッチリストアイテム削除

<!-- omit in toc -->
#### パスパラメータ

| name          | type   | description |
|---------------|--------|-------------|
| watchlist_id  | int    | ウォッチリストID |

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 204 No Content

### DELETE /watchlist

<!-- omit in toc -->
#### Request

```JSON
{
  "watchlistIds": [
    123
  ]
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| watchlistIds  | Number  | 視聴済みのウォッチリストIDリスト    |


## 外部API: The Movie Database API

### 検索

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "title": "スター・ウォーズ",
      "original_title": "Star Wars",
      "poster_path": "/xxx.jpg"
    }
  ]
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| id            | Number  | TMDB内の映画ID      |
| title         | String  | 日本語タイトル      |
| original_title| String  | 原題                |
| poster_path   | String  | ポスター画像のパス  |

### 詳細取得

<!-- omit in toc -->
#### Response

<!-- omit in toc -->
##### 200 OK

```JSON
{
  "title": "スター・ウォーズ",
  "original_title": "Star Wars",
  "release_date": "2026-01-01"
  "poster_path": "/xxx.jpg"
}
```

| field         | type    | description         |
| ------------- | ------- | ------------------- |
| title         | String  | 日本語タイトル      |
| original_title| String  | 原題                |
| release_date  | String  | 公開年月日          |
| poster_path   | String  | ポスター画像のパス  |
