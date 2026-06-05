import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: {} as User,
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: undefined, isAuthenticated: false }),
    }),
    {
      name: 'auth',
    }
  )
);
