-- movie_idの外部キー制約変更
-- reviews
ALTER TABLE reviews
DROP CONSTRAINT fk_reviews_movie;

ALTER TABLE reviews
ALTER COLUMN movie_id DROP NOT NULL;

ALTER TABLE reviews
ADD CONSTRAINT fk_reviews_movie
FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE SET NULL;

-- watchlist_items
ALTER TABLE watchlist_items
DROP CONSTRAINT fk_watchlist_movie;

ALTER TABLE watchlist_items
ALTER COLUMN movie_id DROP NOT NULL;

ALTER TABLE watchlist_items
ADD CONSTRAINT fk_watchlist_movie
FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE SET NULL;


-- watchlist_itemsテーブルの複合UNIQUEキー変更
ALTER TABLE watchlist_items
DROP CONSTRAINT uq_user_movie;

ALTER TABLE watchlist_items
ADD CONSTRAINT uq_user_tmdb UNIQUE (user_id, tmdb_id);