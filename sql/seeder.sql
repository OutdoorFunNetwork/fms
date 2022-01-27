-- Filling users
INSERT INTO users(email, password, active)
  VALUES
    ('eric.miller2129@gmail.com', crypt('test1234', gen_salt('bf')), true),
    ('patrickmcghen@gmail.com', crypt('test1234', gen_salt('bf')), true),
    ('outdoorfunnetwork@gmail.com', crypt('test1234', gen_salt('bf')), true);

INSERT INTO user_info(user_id, display_name, location, avatar, bio, primary_activity)
  VALUES
  (1, 'Eric', 'Pittsburgh, PA', 'https://res.cloudinary.com/outdoorfunnetwork/image/upload/v1636261759/eric_ueigl6.jpg', 'Eric rides his bike sometimes', 'Bike'),
  (2, 'Pat', 'Pittsburgh, PA', 'https://res.cloudinary.com/outdoorfunnetwork/image/upload/v1636261754/pat_kqyl9b.jpg', 'Pat loves riding his bike', 'Bike'),
  (3, 'B the cat', 'Pat''s Couch', 'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png', 'B likes sleeping', 'Sitting on the couch');

INSERT INTO categories(name)
  VALUES
    ('Cat things'),
    ('Bikepacking'),
    ('Backpacking'),
    ('Thom thoughts');

INSERT INTO posts(slug, title, body, author_id, published_at)
  VALUES
    ('first-post', 'First Post', '# First Post\r\nHere are some adventure ideas I had.\r\n  1. Ride bikes\r\n  2. Drink beer\r\nWhat do you think? Should we do those things?', 1, NOW()),
    ('b-post', 'B makes a post', '## B uses headings!', 3, NOW()),
    ('pat-goes-backpacking', 'Pat goes backpacking', '# Heading 1\r\nIf rubbin frozen dirt in your crotch is wrong, hey I dont wanna be right. I had more, but you go ahead. You know, I was God once. And Id do it again! And perhaps a third time! But that would be it.\r\nThats not soon enough! Throw her in the brig. Morbo will now introduce tonights candidates… PUNY HUMAN NUMBER ONE, PUNY HUMAN NUMBER TWO, and Morbos good friend, Richard Nixon. You guys realize you live in a sewer, right?\r\n## I videotape every customer that comes in here, so that I may blackmail them later.', 2, NOW());

INSERT INTO posts_categories(post_id, category_id)
  VALUES
    (1, 4),
    (2, 1),
    (3, 3),
    (3, 4);
