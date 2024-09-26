import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initiatePaymentService, getPaymentHistoryService } from '../services/payment';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

interface PaymentContextType {
  initiatePayment: (amount: number) => Promise<void>;
  getPaymentHistory: () => Promise<Payment[]>;
  paymentHistory: Payment[];
  isLoading: boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const initiatePayment = async (amount: number) => {
    setIsLoading(true);
    try {
      await initiatePaymentService(amount);
      // Refresh payment history after successful payment
      await getPaymentHistory();
    } catch (error) {
      console.error('Payment initiation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentHistory = async () => {
    setIsLoading(true);
    try {
      const history = await getPaymentHistoryService();
      setPaymentHistory(history);
      return history;
    } catch (error) {
      console.error('Get payment history error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ initiatePayment, getPaymentHistory, paymentHistory, isLoading }}>
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