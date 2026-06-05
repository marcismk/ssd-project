import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from './jwt';

export const checkIfAuthenticated = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    await verifyToken(token);
  } catch {
    redirect('/login');
  }
};
