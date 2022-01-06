-- Filling users
INSERT INTO users(email, display_name, location, avatar, bio, primary_activity)
  VALUES
    ('eric.miller2129@gmail.com', 'Eric', 'Pittsburgh, PA', 'https://static.wikia.nocookie.net/p__/images/c/c0/Philip-J-Fry.png/revision/latest?cb=20200507145206&path-prefix=protagonist', 'Eric rides his bike sometimes', 'Bike'),
    ('patrickmcghen@gmail.com', 'Pat', 'Pittsburgh, PA', 'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png', 'Pat loves riding his bike', 'Bike'),
    ('outdoorfunnetwork@gmail.com', 'B the cat', 'Pat''s Couch', 'https://static.wikia.nocookie.net/futuramaworldsoftomorrow_gamepedia_en/images/1/1f/Nibbler.png/revision/latest/scale-to-width-down/250?cb=20170702210232', 'B likes sleeping', 'Sitting on the couch');

INSERT INTO categories(name)
  VALUES
    ('Cat things'),
    ('Bikepacking'),
    ('Backpacking'),
    ('Thom thoughts');

INSERT INTO posts(slug, title, body, author_id)
  VALUES
    ('first-post', 'First Post', '# First Post', 1),
    ('b-post', 'B makes a post', '## B uses headings!', 3),
    ('pat-goes-backpacking', 'Pat goes backpacking', '# Heading 1', 2);

INSERT INTO posts_categories(post_id, category_id)
  VALUES
    (1, 4),
    (2, 1),
    (3, 3),
    (3, 4);