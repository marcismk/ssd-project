import { db } from '@/lib/dbClient';
import type { TokenPayload } from '@/lib/jwt';
import { withAuth } from '@/lib/withAuth';

export const DELETE = withAuth(
  async (
    _req: Request,
    { params }: { params: Promise<Record<string, string>> },
    token: TokenPayload
  ) => {
    const { userId } = token;
    const { id } = await params;
    const postId = Number(id);

    if (!userId) {
      return Response.json({ error: 'userId is required' }, { status: 400 });
    }

    if (!id) {
      return Response.json({ error: 'Invalid post id' }, { status: 400 });
    }

    if (!Number.isInteger(postId) || postId <= 0) {
      return Response.json({ error: 'Invalid post id' }, { status: 400 });
    }

    try {
      await db.execute({
        sql: 'DELETE FROM likes WHERE posts_id = ?',
        args: [postId],
      });

      await db.execute({
        sql: 'DELETE FROM comments WHERE posts_id = ?',
        args: [postId],
      });

      const deleteResult = await db.execute({
        sql: 'DELETE FROM posts WHERE id = ?',
        args: [postId],
      });

      if (!deleteResult.rowsAffected) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
      }

      return Response.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
  }
);
