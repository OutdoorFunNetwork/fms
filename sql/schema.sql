create extension pgcrypto;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create table users (
  uid SERIAL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  display_name TEXT,
  location TEXT,
  avatar TEXT,
  bio TEXT,
  primary_activity TEXT,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_pkey PRIMARY KEY (uid)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON users EXECUTE PROCEDURE trigger_set_timestamp();

create table categories (
  uid SERIAL,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT categories_pkey PRIMARY KEY (uid)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON categories EXECUTE PROCEDURE trigger_set_timestamp();

create table posts (
  uid SERIAL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  author_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT posts_pkey PRIMARY KEY (uid),
  CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES users(uid)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON posts EXECUTE PROCEDURE trigger_set_timestamp();

create table posts_categories (
  post_id INT REFERENCES posts ON DELETE CASCADE,
  category_id INT REFERENCES categories ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_id, category_id),
  CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES posts(uid),
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(uid)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON posts_categories EXECUTE PROCEDURE trigger_set_timestamp();

create table user_tokens (
  token TEXT UNIQUE NOT NULL,
  user_id INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(uid)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON user_tokens EXECUTE PROCEDURE trigger_set_timestamp();