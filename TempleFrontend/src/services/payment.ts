import api from './api';
import { Payment, OfflinePayment } from '../types/payment';

// Uitleg: Deze functie start een betaling met het opgegeven bedrag
// en retourneert de betalingsgegevens. We voegen de autorisatieheader toe.
export const initiatePayment = async (amount: number): Promise<Payment> => {
  const response = await api.post<Payment>('/payments/initiate', { amount });
  return response.data;
};

// Uitleg: Deze functie haalt de betalingsgeschiedenis op
// en retourneert een lijst van betalingen. We voegen de autorisatieheader toe.
export const getPaymentHistory = async (): Promise<Payment[]> => {
  const response = await api.get<Payment[]>('/payments/history');
  return response.data;
};

// Uitleg: Deze functie synchroniseert offline betalingen
// en retourneert niets. We voegen de autorisatieheader toe.
export const syncOfflinePayments = async (offlinePayments: OfflinePayment[]): Promise<void> => {
  await api.post('/payments/sync-offline', { offlinePayments });
};