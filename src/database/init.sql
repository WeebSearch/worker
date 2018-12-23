CREATE TABLE IF NOT EXISTS animes(
    id serial PRIMARY KEY,
    raw_name NVARCHAR(300) UNIQUE NOT NULL,
    anilist_id VARCHAR(100) UNIQUE,
    mal_id VARCHAR(100) UNIQUE,
    name NVARCHAR(300),
    thumbnail_url VARCHAR(300),

    created_at TIMESTAMP,
    updated_at TIMESTAMP,
);
