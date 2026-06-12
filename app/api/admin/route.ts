import { db } from '@/lib/dbClient';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(async (_req, _ctx) => {
  try {
    const result = await db.execute('SELECT id, name, surname, email, roles_id from users');

    return Response.json(result.rows, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
});
