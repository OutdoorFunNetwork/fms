// import ValidationError from '../_core/errors/ValidationError';
import { pg, pool } from '../db.server';
import ValidationError from '../errors/ValidationError';
import { Pagination } from '../models/Pagination';
import { Post } from '../models/Post';

const POST_BASE_QUERY = `
SELECT
    p.*,
    json_build_object(
        'id', user_info.id,
        'display_name', user_info.display_name,
        'avatar', user_info.avatar,
        'bio', user_info.bio
    ) as author,
    ARRAY (
        SELECT
            json_build_object('id', c.id, 'name', c.name)
        FROM
            posts_categories pc
        JOIN
            categories c on c.id = pc.category_id
        WHERE
            pc.post_id = p.id
    ) as categories
FROM posts p
    INNER JOIN user_info ON (user_info.id = p.author_id)
`;

export const findAll = async (
  page: number = 1,
  size: number = 10
): Promise<any> => {
  const rows =  (
    await pg
      .select('*')
      .from<{ data: Post[], pagination: Pagination }>('posts')
      .join('user_info', function () {
        this.on('posts.author_id', '=', 'user_info.id');
      })
      .paginate({ perPage: size, currentPage: page })
  )

  return {
    data: rows.data.map((result: any) => {
      return {
        id: result.id,
        slug: result.slug,
        title: result.title,
        body: result.body,
        published_at: result.published_at,
        author: {
          id: result.author_id,
          displayName: result.display_name,
          location: result.location,
          avatar: result.avatar,
          bio: result.bio,
          primaryActivity: result.primary_activity
        }
      };
    }),
    pagination: rows.pagination,
  }
};
export const findById = async (id: number, published=true): Promise<Post> => {
  const { rows } = await pool.query(`${POST_BASE_QUERY}  WHERE p.id = $1 ${ published ? 'AND published_at IS NOT NULL' : ''}`, [id]);

  return rows[0];
};

export const findBySlug = async (slug: string): Promise<Post> => {
  const { rows } = await pool.query(`${POST_BASE_QUERY} WHERE p.slug=$1`, [slug]);

  return rows[0];
};

export const createPost = async (post: Post, userId: number): Promise<Post> => {
  const foundPost = await findBySlug(post.slug);

  if (foundPost) {
    throw new ValidationError('That slug already exists.');
  }

  let newPost;

  try {
    newPost = await pool.query(
      'INSERT INTO posts(slug,title,body,author_id) VALUES($1,$2,$3,$4) RETURNING *',
      [post.slug, post.title, post.body, userId],
    );
  } catch (e: any) {
    throw new ValidationError(e);
  }

  return newPost.rows[0];
};

export const updatePost = async (post: Post, postId: number): Promise<Post> => {
  const foundPost = await findBySlug(post.slug);

  if (foundPost && foundPost.id !== postId) {
    throw new ValidationError('That slug already exists.');
  }

  // https://stackoverflow.com/questions/13305878/dont-update-column-if-update-value-is-null
  const { rows } = await pool.query(`
    UPDATE posts
    SET
      slug=COALESCE($1, slug),
      title=COALESCE($2, title),
      body=COALESCE($3, body)
    WHERE
      id=$4
    RETURNING *
  `, [post.slug, post.title, post.body, postId]);

  return rows[0];
};

export const publishPost = async (postId: number): Promise<Post> => {
  const foundPost = await findById(postId);

  if (!foundPost) {
    throw new ValidationError('Post not found.', 404);
  }

  const { rows } = await pool.query('UPDATE posts SET published_at=NOW() WHERE id=$1 RETURNING *', [postId]);

  return rows[0];
};

export const unPublishPost = async (postId: number): Promise<Post> => {
  const foundPost = await findById(postId);

  if (!foundPost) {
    throw new ValidationError('Post not found.', 404);
  }

  const { rows } = await pool.query('UPDATE posts SET published_at=null WHERE id=$1 RETURNING *', [postId]);

  return rows[0];
};

export const deletePost = async (postId: number): Promise<number> => {
  const foundPost = await findById(postId);

  if (!foundPost) {
    throw new ValidationError('Post not found.', 404);
  }

  const post = await pool.query('DELETE FROM posts WHERE id=$1', [postId]);

  return post.rowCount;
};
