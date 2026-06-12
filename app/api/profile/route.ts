import { db } from '@/lib/dbClient';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(async (_req, _ctx, token) => {
  const { userId } = token;
  try {
    const result = await db.execute({
      sql: `
        SELECT 
            id, name, surname, email,
            EXISTS(
              SELECT 1
              FROM roles
              WHERE roles.id = users.roles_id
                AND roles.name = 'admin'
            ) as is_admin
        FROM users 
        WHERE id = ?
        `,
      args: [userId],
    });

    return Response.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
});
