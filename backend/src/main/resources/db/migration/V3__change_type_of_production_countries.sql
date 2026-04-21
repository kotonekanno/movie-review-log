-- movie_detailsテーブルのproduction_countriesの型を変更
ALTER TABLE movie_details
ALTER COLUMN production_countries TYPE VARCHAR(2)[]
USING production_countries::VARCHAR(2)[];