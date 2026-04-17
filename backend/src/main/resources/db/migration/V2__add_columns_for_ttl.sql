-- moviesテーブルにlast_used_atカラムを追加
ALTER TABLE movies
ADD COLUMN last_used_at TIMESTAMP;

UPDATE movies
SET last_used_at = CURRENT_TIMESTAMP
WHERE last_used_at IS NULL;

ALTER TABLE movies
ALTER COLUMN last_used_at SET NOT NULL;

ALTER TABLE movies
ALTER COLUMN last_used_at SET DEFAULT CURRENT_TIMESTAMP;


-- tmdb_idカラム追加
-- reviews
ALTER TABLE reviews
ADD COLUMN tmdb_id BIGINT;

UPDATE reviews
SET tmdb_id = (
  SELECT m.tmdb_id
  FROM movies m
  WHERE m.id = reviews.movie_id
);

ALTER TABLE reviews
ALTER COLUMN tmdb_id SET NOT NULL;

-- watchlist_items
ALTER TABLE watchlist_items
ADD COLUMN tmdb_id BIGINT;

UPDATE watchlist_items
SET tmdb_id = (
  SELECT m.tmdb_id
  FROM movies m
  WHERE m.id = watchlist_items.movie_id
);

ALTER TABLE watchlist_items
ALTER COLUMN tmdb_id SET NOT NULL;