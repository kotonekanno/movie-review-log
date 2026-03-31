<!-- omit in toc -->
# API設計

<!-- omit in toc -->
### 一覧

- [認証](#認証)
- [映画](#映画)
  - [`GET /movie?query="query"`](#get-moviequeryquery)
  - [`GET /movie/{tmdb_id}`](#get-movietmdb_id)
- [レビュー](#レビュー)
  - [`POST /reviews`](#post-reviews)
  - [`GET /reviews?page=1`](#get-reviewspage1)
  - [`GET /reviews/{movie_id}`](#get-reviewsmovie_id)
  - [`DELETE /reviews{movie_id}`](#delete-reviewsmovie_id)
- [TMDB: 外部API](#tmdb-外部api)
  - [概要](#概要)
  - [検索](#検索)
  - [詳細取得](#詳細取得)

## 認証


## 映画

### `GET /movie?query="query"`

- `String query`の値から、TMDB内の映画をタイトル検索する
- 検索結果を映画のリストで返す

```JSON
Request: {}
Response:
{
  "results": [
    {
      "tmdbId": Long,
      "jaTitle": String,
      "originalTitle": String,
      "posterPath": String
    },
    {...}
  ]
}
```

### `GET /movie/{tmdb_id}`

- 映画の詳細情報をTMDBから取得する

```JSON
Request: {}
Response:
{
  "jaTitle": String,
  "originalTitle": String,
  "Integer": releaseYear,
  "posterPath": String
}
```


## レビュー

### `POST /reviews`

- レビューを作成・登録する

```JSON
Request:
{
  "movieId": Long,
  "text": String,
  "score": Double,
  "watchedAt": LocalDate
}
Response:
{
  "reviewId": Long
}
```

### `GET /reviews?page=1`

- 作成したレビューの一覧を表示する

```JSON
Request: {}
Response:
{
  "reviews": [
    {
      "title": String,
      "posterPath": String,
      "score": Double
    },
    {...}
  ]
}
```


### `GET /reviews/{movie_id}`

- レビューの詳細を取得する

```JSON
Request: {}
Response:
{
  "jaTitle": String,
  "originalTitle": String,
  "releaseYear": Integer,
  "posterPath": String,
  "score": Double,
  "text": String,
  "watchedAt": LocalDate
}
```

### `DELETE /reviews{movie_id}`

- レビューを削除する


## TMDB: 外部API

### 概要


### 検索

```JSON
Response:
{
  "page": 1,
  "results": [
    {
      "id": Long,
      "title": String,
      "original_title": String,
      "poster_path": String
    },
    {...}
  ]
}
```

### 詳細取得

```JSON
Response:
{
  "title": String,
  "original_title": String,
  "release_date": String,
  "poster_path": String
}
```