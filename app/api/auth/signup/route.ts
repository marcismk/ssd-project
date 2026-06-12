import { cookies } from 'next/headers';
import { db } from '@/lib/dbClient';
import { signToken } from '@/lib/jwt';
import { useAuth } from '@/stores/useAuth';
import { User } from '@/types/user';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const secret = typeof body?.secret === 'string' ? body.secret : '';
    const name = typeof body?.name === 'string' ? body.name : null;
    const surname = typeof body?.surname === 'string' ? body.surname : null;

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingResult = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ? LIMIT 1',
      args: [email],
    });
    const existing = existingResult.rows[0];

    if (existing) {
      return Response.json({ error: 'Email already in use' }, { status: 409 });
    }

    const insertResult = await db.execute({
      sql: 'INSERT INTO users (name, surname, email, password, secret, roles_id) VALUES (?, ?, ?, ?, ?, ?)',
      args: [name, surname, email, password, secret, 1],
    });

    if (insertResult.lastInsertRowid === undefined || insertResult.lastInsertRowid === null) {
      return Response.json({ error: 'Failed to create user' }, { status: 500 });
    }

    const userResult = await db.execute({
      sql: 'SELECT id, email, name, surname FROM users WHERE id = ? LIMIT 1',
      args: [insertResult.lastInsertRowid],
    });
    const user = userResult.rows[0] as unknown as User | undefined;

    if (!user) {
      return Response.json({ error: 'Failed to create user' }, { status: 500 });
    }

    useAuth.getState().setUser(user);

    const token = await signToken({
      userId: Number(user.id),
      email: user.email,
    });

    cookieStore.set({
      name: 'token',
      value: token,
      path: '/',
      sameSite: 'lax',
    });

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
