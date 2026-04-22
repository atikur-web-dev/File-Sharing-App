import { createContext } from 'react';
import type { User } from '../types';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);