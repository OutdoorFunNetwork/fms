DROP DATABASE ofn_content;
CREATE database ofn_content;

use ofn_content;

create table users (
  uid SERIAL,
  display_name TEXT,
  email TEXT NOT NULL,
  location TEXT
  avatar TEXT
  bio TEXT
  primary_activity TEXT
  CONSTRAINT users_pkey PRIMARY KEY (uid)
);

create table categories (
  uid SERIAL,
  name TEXT NOT NULL,
  CONSTRAINT categories_pkey PRIMARY KEY (uid)
);

create table posts (
  uid SERIAL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  author_id INT NOT NULL,
  CONSTRAINT posts_pkey PRIMARY KEY (uid),
  CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES users(uid),
)

create table posts_categories (
  post_id INT,
  category_id INT,
  PRIMARY KEY (post_id, category_id),
  CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES posts(uid),
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(uid),
)