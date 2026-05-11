import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('lakna_token'),
  isAuthenticated: !!localStorage.getItem('lakna_token'),
  setAuth: (user, token) => {
    localStorage.setItem('lakna_token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('lakna_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
