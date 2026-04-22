import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext, type AuthContextType } from './AuthContext';
import type { User } from '../types';
import { getCurrentUserApi, logoutApi } from '../api/authApi';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUserApi();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      setUser(null);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};