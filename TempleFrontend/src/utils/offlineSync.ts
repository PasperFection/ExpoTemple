import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { initiatePayment } from '../services/payment';

export const syncOfflinePayments = async () => {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);
  
  if (isConnected) {
    const offlinePayments = await AsyncStorage.getItem('offlinePayments');
    if (offlinePayments) {
      const payments = JSON.parse(offlinePayments);
      for (const payment of payments) {
        try {
          await initiatePayment(payment.amount);
        } catch (error) {
          console.error('Failed to sync offline payment:', error);
        }
      }
      await AsyncStorage.removeItem('offlinePayments');
    }
  }
};

export const saveOfflinePayment = async (amount: number) => {
  const offlinePayments = await AsyncStorage.getItem('offlinePayments');
  const payments = offlinePayments ? JSON.parse(offlinePayments) : [];
  payments.push({ amount, date: new Date().toISOString() });
  await AsyncStorage.setItem('offlinePayments', JSON.stringify(payments));
};