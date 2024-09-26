import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { OfflinePayment } from '../types/payment';
import { syncOfflinePayments } from '../services/payment';

interface OfflinePaymentContextType {
  offlinePayments: OfflinePayment[];
  addOfflinePayment: (payment: OfflinePayment) => Promise<void>;
  syncOfflinePayments: () => Promise<void>;
}

export const OfflinePaymentContext = createContext<OfflinePaymentContextType | undefined>(undefined);

export const OfflinePaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [offlinePayments, setOfflinePayments] = useState<OfflinePayment[]>([]);

  useEffect(() => {
    loadOfflinePayments();
  }, []);

  const loadOfflinePayments = async () => {
    try {
      const storedPayments = await AsyncStorage.getItem('offlinePayments');
      if (storedPayments) {
        setOfflinePayments(JSON.parse(storedPayments));
      }
    } catch (error) {
      console.error('Error loading offline payments:', error);
    }
  };

  const addOfflinePayment = async (payment: OfflinePayment) => {
    try {
      const updatedPayments = [...offlinePayments, payment];
      setOfflinePayments(updatedPayments);
      await AsyncStorage.setItem('offlinePayments', JSON.stringify(updatedPayments));
    } catch (error) {
      console.error('Error adding offline payment:', error);
    }
  };

  const syncOfflinePaymentsHandler = async () => {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      console.log('No internet connection. Cannot sync offline payments.');
      return;
    }

    try {
      await syncOfflinePayments(offlinePayments);
      setOfflinePayments([]);
      await AsyncStorage.removeItem('offlinePayments');
    } catch (error) {
      console.error('Error syncing offline payments:', error);
    }
  };

  return (
    <OfflinePaymentContext.Provider
      value={{
        offlinePayments,
        addOfflinePayment,
        syncOfflinePayments: syncOfflinePaymentsHandler
      }}
    >
      {children}
    </OfflinePaymentContext.Provider>
  );
};

export const useOfflinePayment = () => {
  const context = useContext(OfflinePaymentContext);
  if (context === undefined) {
    throw new Error('useOfflinePayment must be used within an OfflinePaymentProvider');
  }
  return context;
};