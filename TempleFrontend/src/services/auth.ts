import api from './api';
import { User, AuthResponse } from '../types/user';

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return {
    id: Number(response.data.userId),
    email,
    token: response.data.token
  };
};

export const register = async (email: string, password: string): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/register', { email, password });
  return {
    id: Number(response.data.userId),
    email,
    token: response.data.token
  };
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const refreshToken = async (token: string): Promise<string> => {
  const response = await api.post<{ token: string }>('/auth/refresh-token', { token });
  return response.data.token;
};

export const refreshTokenService = async (token: string): Promise<string> => {
  const response = await api.post<{ token: string }>('/auth/refresh-token', { token });
  return response.data.token;
};

