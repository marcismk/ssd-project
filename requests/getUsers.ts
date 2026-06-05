import { httpClient } from '@/lib/client';
import { User } from '@/types/user';

export const getUsers = async () => {
  try {
    return await httpClient.get<User[]>('admin');
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
