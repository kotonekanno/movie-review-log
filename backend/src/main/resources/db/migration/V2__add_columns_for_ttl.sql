-- movie_detailsテーブル作成
CREATE TABLE movie_details (
  movie_id INTEGER PRIMARY KEY,
  expires_at TIMESTAMP NOT NULL,
  genres TEXT[],
  production_countries TEXT[],
  release_year INT,
  runtime INT,
  CONSTRAINT fk_movie_details_movie FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE
);


-- moviesテーブル変更
ALTER TABLE movies DROP COLUMN release_year;


-- reviewsテーブル
-- tmdb_id追加
ALTER TABLE reviews ADD COLUMN tmdb_id BIGINT;

UPDATE reviews r
SET tmdb_id = m.tmdb_id
FROM movies m
WHERE m.id = r.movie_id;

ALTER TABLE reviews ALTER COLUMN tmdb_id SET NOT NULL;

-- movie_id削除
ALTER TABLE reviews DROP COLUMN movie_id;


-- watchlist_itemsにtmdb_id追加
ALTER TABLE watchlist_items ADD COLUMN tmdb_id BIGINT;

UPDATE watchlist_items w
SET tmdb_id = m.tmdb_id
FROM movies m
WHERE m.id = w.movie_id;

ALTER TABLE watchlist_items ALTER COLUMN tmdb_id SET NOT NULL;

-- UNIQUE制約変更
ALTER TABLE watchlist_items
DROP CONSTRAINT IF EXISTS uq_user_movie;

ALTER TABLE watchlist_items
ADD CONSTRAINT uq_watchlist_user_tmdb UNIQUE (user_id, tmdb_id);

-- movie_id削除
ALTER TABLE watchlist_items DROP COLUMN movie_id;