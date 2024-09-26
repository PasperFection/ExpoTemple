import axios from 'axios';
import { API_URL } from '../utils/constants';

export const initiatePaymentService = async (amount: number) => {
  try {
    const response = await axios.post(`${API_URL}/payments`, { amount });
    return response.data;
  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
};

export const getPaymentHistoryService = async () => {
  try {
    const response = await axios.get(`${API_URL}/payments/history`);
    return response.data;
  } catch (error) {
    console.error('Get payment history error:', error);
    throw error;
  }
};