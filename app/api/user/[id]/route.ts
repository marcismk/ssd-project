import { db } from '@/lib/dbClient';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(async (_req, ctx: Record<string, any>) => {
  const { id } = await ctx.params;
  try {
    const result = await db.execute({
      sql: `
        SELECT 
            id, name, surname, email, secret,
            EXISTS(
              SELECT name
              FROM roles
              WHERE roles.id = users.roles_id
            ) as role
        FROM users 
        WHERE id = ?
        `,
      args: [id],
    });

    return Response.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
});
