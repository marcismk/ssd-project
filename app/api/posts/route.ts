import { db } from '@/lib/dbClient';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(async () => {
  try {
    const result = await db.execute({
      sql: `SELECT p.id, p.title, p.image, p.meta, p.created_at,
				        u.id AS author_id, u.name AS author_name, u.surname AS author_surname,
                        (SELECT COUNT(*) FROM likes WHERE posts_id = p.id) AS likes,
                        (SELECT COUNT(*) FROM comments WHERE posts_id = p.id) AS comments
				 FROM posts p
				 JOIN users u ON u.id = p.users_id
 				 ORDER BY p.created_at DESC`,
    });

    return Response.json({ posts: result.rows }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
});

export const POST = withAuth(async (req: Request, _ctx, token) => {
  const { userId } = token;
  try {
    const body = await req.json();
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const image = typeof body?.image === 'string' ? body.image.trim() : null;
    const meta = typeof body?.meta === 'string' ? body.meta.trim() : null;

    if (!title || !userId) {
      return Response.json({ error: 'title and userId are required' }, { status: 400 });
    }

    const insertResult = await db.execute({
      sql: 'INSERT INTO posts (title, image, meta, users_id, created_by) VALUES (?, ?, ?, ?, ?)',
      args: [title, image, meta, userId, userId],
    });

    if (insertResult.lastInsertRowid === undefined || insertResult.lastInsertRowid === null) {
      return Response.json({ error: 'Failed to create post' }, { status: 500 });
    }

    const postResult = await db.execute({
      sql: 'SELECT * FROM posts WHERE id = ? LIMIT 1',
      args: [insertResult.lastInsertRowid],
    });

    return Response.json({ post: postResult.rows[0] }, { status: 201 });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
});
