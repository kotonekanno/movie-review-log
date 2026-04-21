-- users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
);

-- movies
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    tmdb_id BIGINT NOT NULL UNIQUE,
    ja_title TEXT,
    original_title TEXT NOT NULL,
    release_year INT,
    poster_path TEXT
);

-- reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    score NUMERIC(2,1) CHECK (score >= 0 AND score <= 5) NOT NULL,
    text TEXT,
    watched_at DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_reviews_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_movie FOREIGN KEY(movie_id) REFERENCES movies(id)
);

-- watchlist_items
CREATE TABLE watchlist_items (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    priority INT CHECK (priority >= 0 AND priority <= 100) NOT NULL,
    note TEXT,
    is_watched BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_movie UNIQUE (user_id, movie_id),
    CONSTRAINT fk_watchlist_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_watchlist_movie FOREIGN KEY(movie_id) REFERENCES movies(id)
);
