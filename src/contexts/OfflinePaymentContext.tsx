import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { syncOfflinePayments } from '../utils/offlineSync';

interface OfflinePaymentContextType {
  offlinePayments: number;
  addOfflinePayment: (amount: number) => Promise<void>;
  syncPayments: () => Promise<void>;
}

const OfflinePaymentContext = createContext<OfflinePaymentContextType | undefined>(undefined);

export const OfflinePaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [offlinePayments, setOfflinePayments] = useState(0);

  useEffect(() => {
    const loadOfflinePayments = async () => {
      const storedPayments = await AsyncStorage.getItem('offlinePayments');
      if (storedPayments) {
        setOfflinePayments(JSON.parse(storedPayments).length);
      }
    };
    loadOfflinePayments();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncPayments();
      }
    });

    return () => unsubscribe();
  }, []);

  const addOfflinePayment = async (amount: number) => {
    await saveOfflinePayment(amount);
    setOfflinePayments(prev => prev + 1);
  };

  const syncPayments = async () => {
    await syncOfflinePayments();
    setOfflinePayments(0);
  };

  return (
    <OfflinePaymentContext.Provider value={{ offlinePayments, addOfflinePayment, syncPayments }}>
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