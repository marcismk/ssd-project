import { httpClient } from '@/lib/client';
import { User } from '@/types/user';

interface UserWithRole extends User {
  role: number;
  secret: string;
}

export const getUserDetails = async (id: number) => {
  try {
    return await httpClient.get<UserWithRole>(`user/${id}`);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
