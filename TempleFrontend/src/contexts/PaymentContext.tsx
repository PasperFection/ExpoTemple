import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Payment, OfflinePayment } from '../types/payment';
import { initiatePayment, getPaymentHistory, syncOfflinePayments } from '../services/payment';

interface PaymentContextType {
  paymentHistory: Payment[];
  initiatePayment: (amount: number) => Promise<void>;
  fetchPaymentHistory: () => Promise<void>;
  syncOfflinePayments: (offlinePayments: OfflinePayment[]) => Promise<void>;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);

  const initPayment = async (amount: number) => {
    try {
      await initiatePayment(amount);
      await fetchPaymentHistory();
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw error;
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const history = await getPaymentHistory();
      setPaymentHistory(history);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  };

  const syncOffline = async (offlinePayments: OfflinePayment[]) => {
    try {
      await syncOfflinePayments(offlinePayments);
      await fetchPaymentHistory();
    } catch (error) {
      console.error('Error syncing offline payments:', error);
      throw error;
    }
  };

  return (
    <PaymentContext.Provider value={{
      paymentHistory,
      initiatePayment: initPayment,
      fetchPaymentHistory,
      syncOfflinePayments: syncOffline
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};