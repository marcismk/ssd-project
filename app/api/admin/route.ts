import { connectDB } from '@/lib/dbClient';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(async (_req, _ctx) => {
  const db = connectDB();
  try {
    const users = db.prepare(`SELECT id, name, surname, email, roles_id from users`).all();

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  } finally {
    db.close();
  }
});
