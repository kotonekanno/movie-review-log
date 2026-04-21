<!-- omit in toc -->
# API設計

<!-- omit in toc -->
### 一覧

- [認証](#認証)
  - [POST /register](#post-register)
  - [POST /login](#post-login)
  - [POST /logout](#post-logout)
  - [GET /me](#get-me)
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
  - [DELETE /watchlist/bulk-delete](#delete-watchlistbulk-delete)
- [外部API: The Movie Database API](#外部api-the-movie-database-api)
  - [検索](#検索)
  - [詳細取得](#詳細取得)

## 認証

### POST /register

ユーザー登録

<!-- omit in toc -->
#### Request

- Content-Type: `application/x-www-form-urlencoded`
- Body:
  | name     | type   | required | description    |
  | -------- | ------ | -------- | -------------- |
  | email    | string | yes      | メールアドレス |
  | password | string | yes      | パスワード     |

<!-- omit in toc -->
#### Response

- `201 Created`
- Content-Type: `application/json`
- Body:
  | field  | type    | description |
  | ------ | ------- | ----------- |
  | userId | integer | ユーザーID  |

---

### POST /login

ユーザー認証（Spring Security）

<!-- omit in toc -->
#### Request

- Content-Type: `application/x-www-form-urlencoded`
- Body:
  | name     | type   | required | description    |
  | -------- | ------ | -------- | -------------- |
  | email    | string | yes      | メールアドレス |
  | password | string | yes      | パスワード     |

<!-- omit in toc -->
#### Response

- `204 No Content`

---

### POST /logout

ログアウト（Spring Security）

<!-- omit in toc -->
#### Response

- `204 No Content`

---

### GET /me

ログイン中であることを確かめる

<!-- omit in toc -->
#### Response

- `200 OK`

---

## 映画

### GET /movies

TMDBで映画をタイトル検索し、20件取得する

<!-- omit in toc -->
#### Request

- Query Parameters: 
  | name  | type   | required | description                |
  | ----- | ------ | -------- | -------------------------- |
  | query | string | yes      | 検索キーワード（タイトル） |

<!-- omit in toc -->
#### Response

- `200 OK`
- Content-Type: `application/json`
- Body:
  | field         | type    | description        |
  | ------------- | ------- | ------------------ |
  | tmdbId        | integer | TMDB内のID         |
  | jaTitle       | string  | 日本語タイトル     |
  | originalTitle | string  | 原題               |
  | posterPath    | string  | ポスター画像のパス |

- Example:
  ```json
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

---

### GET /movies/{tmdb_id}

映画の詳細情報をTMDBから取得する

<!-- omit in toc -->
#### Request

- Path Parameters:
  | name    | type    | required | description |
  | ------- | ------- | -------- | ----------- |
  | tmdb_id | integer | yes      | TMDB内のID  |

<!-- omit in toc -->
#### Response

- `200 OK`
- Content-Type: `application/json`
- Body:
  | field               | type    | description        |
  | ------------------- | ------- | ------------------ |
  | tmdbId              | integer | TMDB内の映画ID     |
  | jaTitle             | string  | 日本語タイトル     |
  | originalTitle       | string  | 原題               |
  | posterPath          | string  | ポスター画像のパス |
  | genres              | array   | ジャンル           |
  | productionCountries | array   | 製作国             |
  | releaseYear         | integer | 公開年             |
  | runtime             | integer | 上映時間[分]       |

- Example:
  ```json
  {
    "tmdbId": 11,
    "jaTitle": "スター・ウォーズ",
    "originalTitle": "Star Wars",
    "posterPath": "/xxx.jpg",
    "genres": [
      "SF"
    ],
    "productionCountries": [
      "United States of America"
    ],
    "releaseYear": 1977,
    "runtime": 121
  }
  ```

## レビュー

### POST /reviews

レビュー作成

<!-- omit in toc -->
#### Request

- Content-Type: `application/json`
- Body:
  | field     | type    | required | description      |
  | --------- | ------- | -------- | ---------------- |
  | tmdbId    | integer | yes      | TMDB内の映画ID   |
  | text      | string  | no       | 感想文           |
  | score     | number  | yes      | 点数（0.0〜5.0） |
  | watchedAt | string  | yes      | 視聴日           |

- Example:
  ```json
  {
    "tmdbId": 11,
    "text": "面白かった",
    "score": 4.8,
    "watchedAt": "2026-01-01"
  }
  ```

<!-- omit in toc -->
#### Response

- `201 Created`
- Content-Type: `application/json`
- Body:
  | field    | type    | description |
  | -------- | ------- | ----------- |
  | reviewId | integer | レビューID  |

- Example:
  ```json
  {
    "reviewId": 123
  }
  ```

---

### GET /reviews

レビュー一覧取得

<!-- omit in toc -->
#### Request

- Query Parameters:
  | name  | type    | required | default   | description  |
  | ----- | ------- | -------- | --------- | ------------ |
  | page  | integer | no       | 1         | ページ数     |
  | sort  | string  | no       | createdAt | 並べ替えキー |
  | order | string  | no       | desc      | 昇順／降順   |

<!-- omit in toc -->
#### Response

- `200 OK`
- Content-Type: `application/json`
- Body:
  | field         | type    | description           |
  | ------------- | ------- | --------------------- |
  | reviews       | array   | 最大12個のレビュー    |
  | └ reviewId   | integer | レビューID            |
  | └ title      | string  | 日本語タイトル        |
  | └ posterPath | string  | ポスター画像のパス    |
  | └ score      | number  | 点数（0.0〜5.0）      |
  | totalPages    | integer | (レビュー数 / 12) + 1 |

- Body:
  ```json
  {
    "reviews": [
      {
        "reviewId": 123,
        "title": "スター・ウォーズ",
        "posterPath": "/xxx.jpg",
        "score": 4.8
      }
    ],
    "totalPages": 3
  }
  ```

---

### GET /reviews/{review_id}

レビューの詳細取得

<!-- omit in toc -->
#### Request

- Path Parameters:
  | name      | type    | required | description |
  | --------- | ------- | -------- | ----------- |
  | review_id | integer | yes      | レビューID  |

<!-- omit in toc -->
#### Response

- `200 OK`
- Content-Type: `application/json`
- Body:
  | field                  | type    | description        |
  | ---------------------- | ------- | ------------------ |
  | reviewId               | integer | レビューID         |
  | score                  | number  | 点数（0.0〜5.0）   |
  | text                   | string  | 感想文             |
  | watchedAt              | string  | 視聴日             |
  | movie                  | object  | 映画詳細情報       |
  | └ tmdbId              | integer | TMDB内の映画ID     |
  | └ jaTitle             | string  | 日本語タイトル     |
  | └ originalTitle       | string  | 原題               |
  | └ posterPath          | string  | ポスター画像のパス |
  | └ genres              | array   | ジャンル           |
  | └ productionCountries | array   | 製作国             |
  | └ releaseYear         | integer | 公開年             |
  | └ runtime             | integer | 上映時間[分]       |

- Example:
  ```json
  {
    "reviewId": 123,
    "score": 5.0,
    "text": "最高だった",
    "watchedAt": "2026-01-01",
    "movie": {
      "tmdbId": 11,
      "jaTitle": "スター・ウォーズ",
      "originalTitle": "Star Wars",
      "posterPath": "/xxx.jpg",
      "genres": [
        "SF"
      ],
      "productionCountries": [
        "The United States of America"
      ],
      "releaseYear": 1977,
      "runtime": 121
    }
  }
  ```

---

### PATCH /reviews/{review_id}

レビュー更新

<!-- omit in toc -->
#### Request

- Path Parameters:
  | name      | type    | required | description |
  | --------- | ------- | -------- | ----------- |
  | review_id | integer | yes      | レビューID  |
- Content-Type: `application/json`
- Body:
  | field     | type    | required | description     |
  | --------- | ------- | -------- | --------------- |
  | tmdbId    | integer | no       | TMDB内の映画ID  |
  | text      | string  | no       | 感想文          |
  | score     | number  | no       | 点数（0.0-5.0） |
  | watchedAt | string  | no       | 視聴日          |

- Example:
  ```json
  {
    "tmdbId": 11,
    "text": "面白かった",
    "score": 4.8,
    "watchedAt": "2026-01-01"
  }
  ```

<!-- omit in toc -->
#### Response

- `204 No Content`

---

### DELETE /reviews/{review_id}

レビュー削除

<!-- omit in toc -->
#### Request

- Path Parameters:
  | name      | type    | required | description |
  | --------- | ------- | -------- | ----------- |
  | review_id | integer | yes      | レビューID  |

<!-- omit in toc -->
#### Response

- `204 No Content`


## ウォッチリスト

### POST /watchlist

ウォッチリスト追加

<!-- omit in toc -->
#### Request

- Content-Type: `application/json`
- Body:
  | field    | type    | required | description  |
  | -------- | ------- | -------- | ------------ |
  | tmdbId   | integer | yes      | TMDB内の映画ID |
  | note     | string  | no       | メモ         |
  | priority | integer | yes      | 優先度(%)    |

- Example:
  ```json
  {
    "tmdbId": 11,
    "note": "面白そう",
    "priority": 88
  }
  ```

<!-- omit in toc -->
#### Response

- `201 Created`
- Content-Type: `application/json`
- Body:
  | field       | type    | description      |
  | ----------- | ------- | ---------------- |
  | watchlistId | integer | ウォッチリストID |

- Example:
  ```json
  {
    "watchlistId": 123
  }
  ```

---

### GET /watchlist

ウォッチリスト取得

<!-- omit in toc -->
#### Request

- Query Parameters:
  | name | type    | required | description |
  | ---- | ------- | -------- | ----------- |
  | page | integer | yes      | ページ数    |

<!-- omit in toc -->
#### Response

- `200 OK`
- Content-Type: `application/json`
- Body:
  | field              | type    | description          |
  | ------------------ | ------- | -------------------- |
  | watchlist          | array   | 全てのウォッチリスト |
  | └ watchlistId     | integer | ウォッチリストID     |
  | └ isWatched       | boolean | 視聴済みならばtrue   |
  | └ priority        | integer | 優先度(%)            |
  | └ note            | string  | メモ                 |
  | └ movie           | object  | 映画詳細情報         |
  | │└ tmdbId        | integer | TMDB内の映画ID       |
  | │└ jaTitle       | string  | 日本語タイトル       |
  | │└ originalTitle | string  | 原題                 |
  | │└ posterPath    | string  | ポスター画像のパス   |
  | watched            | integer | 視聴済み件数         |

- Example:
```json
  {
    "watchlist": [
      {
        "watchlistId": 123,
        "isWatched": true,
        "priority": 90,
        "note": "見たい",
        "movie": {
          "tmdbId": 11,
          "jaTitle": "スター・ウォーズ",
          "originalTitle": "Star Wars",
          "posterPath": "/xxx.jpg"
        }
      }
    ],
    "watched": 10
  }
  ```

---

### PATCH /watchlist/{watchlist_id}

ウォッチリストアイテム編集

<!-- omit in toc -->
#### Request

- Path Parameters:
  | name         | type    | required | description      |
  | ------------ | ------- | -------- | ---------------- |
  | watchlist_id | integer | yes      | ウォッチリストID |

<!-- omit in toc -->
#### Response

- `204 No Content`

---

### PATCH /watchlist

ウォッチリスト視聴済みフラグ変更

<!-- omit in toc -->
#### Request

- Content-Type: `application/json`
- Body:
  | field       | type    | required | description        |
  | ----------- | ------- | -------- | ------------------ |
  | watchlistId | integer | yes      | ウォッチリストID   |
  | isWatched   | boolean | yes      | 視聴済みならばtrue |

- Example:
  ```json
  {
    "watchlistId": 123,
    "isWatched": true
  }
  ```

<!-- omit in toc -->
#### Response

- `204 No Content`

---

### DELETE /watchlist/{watchlist_id}

ウォッチリストアイテム削除

<!-- omit in toc -->
#### Request

- Path Parameter
  | name         | type    | required | description      |
  | ------------ | ------- | -------- | ---------------- |
  | watchlist_id | integer | yes      | ウォッチリストID |

<!-- omit in toc -->
#### Response

- `204 No Content`

---

### DELETE /watchlist/bulk-delete

視聴済み作品をウォッチリストから一括削除

<!-- omit in toc -->
#### Response

- `204 No Content`


## 外部API: The Movie Database API

### 検索

タイトルから映画検索

https://api.themoviedb.org/3/search/movie

<!-- omit in toc -->
#### Request

- Query Parameters:
  | name          | type    | description             |
  | ------------- | ------- | ----------------------- |
  | query         | string  | 検索ワード（タイトル）  |
  | include_adult | boolean | 成人向け作品を含むか    |
  | language      | string  | 言語（ロケールID）      |
  | page          | integer | ページ数（1ページ20件） |

<!-- omit in toc -->
#### Response

- `200 OK`
- Body:
  | field          | type    | description        |
  | -------------- | ------- | ------------------ |
  | id             | integer | TMDB内の映画ID     |
  | title          | string  | 日本語タイトル     |
  | original_title | string  | 原題               |
  | poster_path    | string  | ポスター画像のパス |

- Example:
  ```json
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

---

### 詳細取得

TMDB IDから映画の詳細情報を取得

https://api.themoviedb.org/3/movie/{id}

<!-- omit in toc -->
#### Request

- Path Parameters:
  | name | type    | description    |
  | ---- | ------- | -------------- |
  | id   | integer | TMDB内の映画ID |

- Query Parameters:
  | name     | type   | description        |
  | -------- | ------ | ------------------ |
  | language | string | 言語（ロケールID） |

<!-- omit in toc -->
#### Response

- `200 OK`
- Body:
  | field                | type    | description        |
  | -------------------- | ------- | ------------------ |
  | title                | string  | 日本語タイトル     |
  | original_title       | string  | 原題               |
  | poster_path          | string  | ポスター画像のパス |
  | genres               | array   | ジャンル           |
  | production_countries | array   | 製作国             |
  | release_date         | string  | 公開年月日         |
  | runtime              | integer | 上映時間[分]       |

- Example:
  ```json
  {
    "title": "スター・ウォーズ",
    "original_title": "Star Wars",
    "poster_path": "/xxx.jpg",
    "genres": [
      {
        "name": "Science Fiction"
      }
    ],
    "production_countries": [
      {
        "name": "United States of America"
      }
    ],
    "release_date": "2026-01-01",
    "runtime": 121
  }
  ```