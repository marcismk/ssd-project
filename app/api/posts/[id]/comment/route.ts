import { db } from '@/lib/dbClient';
import type { TokenPayload } from '@/lib/jwt';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(
  async (_req: Request, { params }: { params: Promise<Record<string, string>> }) => {
    const { id } = await params;
    const postId = Number(id);

    if (!Number.isInteger(postId) || postId <= 0) {
      return Response.json({ error: 'Invalid post id' }, { status: 400 });
    }

    try {
      const result = await db.execute({
        sql: `SELECT 
						c.id, c.content, c.posts_id, c.created_at, c.created_by, u.name AS author_name, u.surname AS author_surname
						FROM comments c
						LEFT JOIN users u ON c.created_by = u.id
						WHERE c.posts_id = ?
        					ORDER BY c.created_at DESC`,
        args: [postId],
      });

      return Response.json(result.rows, { status: 200 });
    } catch (error) {
      console.log(error);
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
  }
);

export const POST = withAuth(
  async (
    req: Request,
    { params }: { params: Promise<Record<string, string>> },
    token: TokenPayload
  ) => {
    const body = await req.json();
    const { userId } = token;
    const { id } = await params;
    const postId = Number(id);
    const content = typeof body?.content === 'string' ? body.content.trim() : '';

    if (!userId) {
      return Response.json({ error: 'userId is required' }, { status: 400 });
    }

    if (!Number.isInteger(postId) || postId <= 0) {
      return Response.json({ error: 'Invalid post id' }, { status: 400 });
    }

    if (!content) {
      return Response.json({ error: 'content is required' }, { status: 400 });
    }

    try {
      await db.execute({
        sql: 'INSERT INTO comments (content, posts_id, created_by) VALUES (?, ?, ?)',
        args: [content, postId, userId],
      });

      return Response.json({ message: 'Comment added successfully' }, { status: 201 });
    } catch (error) {
      console.log(error);
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
  }
);
