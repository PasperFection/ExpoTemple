import { useContext } from 'react';
import { OfflinePaymentContext } from '../contexts/OfflinePaymentContext';

export const useOfflinePayment = () => {
  const context = useContext(OfflinePaymentContext);
  if (context === undefined) {
    throw new Error('useOfflinePayment must be used within an OfflinePaymentProvider');
  }
  return context;
};