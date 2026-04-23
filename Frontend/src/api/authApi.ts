import api from './axios';
import type {
  ApiResponse,
  User,
  RegisterFormData,
  LoginFormData,
  UpdateProfileData,
  ChangePasswordData,
} from '../types';

export const registerApi = async (data: RegisterFormData): Promise<User> => {
  const response = await api.post<ApiResponse<{ user: User }>>('/auth/register', data);

  if (response.data.success && response.data.data?.user) {
    return response.data.data.user;
  }

  throw new Error(response.data.message || 'Registration failed');
};

export const loginApi = async (data: LoginFormData): Promise<User> => {
  const response = await api.post<ApiResponse<{ user: User }>>('/auth/login', data);

  if (response.data.success && response.data.data?.user) {
    return response.data.data.user;
  }

  throw new Error(response.data.message || 'Login failed');
};

export const logoutApi = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getCurrentUserApi = async (): Promise<User | null> => {
  try {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');

    if (response.data.success && response.data.data?.user) {
      return response.data.data.user;
    }

    return null;
  } catch {
    return null;
  }
};

export const verifyEmailApi = async (
  token: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.get<ApiResponse>(`/auth/verify/${token}`);

  return {
    success: response.data.success,
    message: response.data.message,
  };
};

export const updateProfileApi = async (data: UpdateProfileData): Promise<User> => {
  const response = await api.put<ApiResponse<{ user: User }>>('/auth/profile', data);

  if (response.data.success && response.data.data?.user) {
    return response.data.data.user;
  }

  throw new Error(response.data.message || 'Profile update failed');
};

export const changePasswordApi = async (data: ChangePasswordData): Promise<void> => {
  const response = await api.post<ApiResponse>('/auth/change-password', data);

  if (!response.data.success) {
    throw new Error(response.data.message || 'Password change failed');
  }
};

export const requestPasswordResetApi = async (email: string): Promise<void> => {
  const response = await api.post<ApiResponse>('/auth/forgot-password', { email });

  if (!response.data.success) {
    throw new Error(response.data.message || 'Password reset request failed');
  }
};

export const resetPasswordApi = async (
  token: string,
  newPassword: string
): Promise<void> => {
  const response = await api.post<ApiResponse>('/auth/reset-password', {
    token,
    newPassword,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || 'Password reset failed');
  }
};