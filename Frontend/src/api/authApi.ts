import api from './axios';
import type { ApiResponse, User } from '../types';

// ============================================
// GET CURRENT USER
// ============================================

export const getCurrentUserApi = async (): Promise<User | null> => {
  try {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    
    if (response.data.success && response.data.data?.user) {
      return response.data.data.user;
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

// ============================================
// LOGOUT
// ============================================

export const logoutApi = async (): Promise<void> => {
  await api.post('/auth/logout');
};