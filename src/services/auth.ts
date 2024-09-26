import axios from 'axios';
import { API_URL } from '../utils/constants';

export const loginService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const logoutService = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

// Voeg deze functie toe aan het bestand
export const refreshTokenService = async (): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`);
    return response.data.token;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};