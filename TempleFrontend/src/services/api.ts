import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const register = (email: string, password: string) => api.post('/auth/register', { email, password });
export const refreshToken = (token: string) => api.post('/auth/refresh-token', { token });
export const initiatePayment = (amount: number) => api.post('/payments/initiate', { amount });
export const getPaymentHistory = () => api.get('/payments/history');
export const syncOfflinePayments = (offlinePayments: any[]) => api.post('/payments/sync-offline', { offlinePayments });

export default api;