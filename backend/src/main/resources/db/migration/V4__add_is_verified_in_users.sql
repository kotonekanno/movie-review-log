-- usersテーブルにカラムis_verifiedを追加
ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;

UPDATE users SET is_verified = FALSE;

ALTER TABLE users ALTER COLUMN is_verified SET NOT NULL;
