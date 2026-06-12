import { cookies } from 'next/headers';
import { db } from '@/lib/dbClient';
import { signToken } from '@/lib/jwt';

interface UserRow {
  id: number;
  email: string;
  name: string;
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const remember = body?.remember === true;

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const result = await db.execute({
      sql: 'SELECT id, email, name FROM users WHERE email = ? AND password = ? LIMIT 1',
      args: [email, password],
    });
    const user = result.rows[0] as unknown as UserRow | undefined;

    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ userId: Number(user.id), email: user.email });

    cookieStore.set({
      name: 'token',
      value: token,
      path: '/',
      sameSite: 'lax',
      ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}),
    });

    return Response.json({ user }, { status: 200 });
  } catch (err) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
