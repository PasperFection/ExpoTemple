import { OfflinePayment, Payment as PaymentType } from '../types/payment';
import logger from '../utils/logger';
import Payment from '../models/payment';

export class PaymentService {
  static async initiatePayment(userId: number, amount: number): Promise<PaymentType> {
    try {
      const payment = await Payment.create({
        userId,
        amount,
        status: 'pending'
      });
      logger.info(`Payment initiated: ${payment.id} for user ${userId}`);
      return payment.toJSON() as PaymentType;
    } catch (error) {
      logger.error(`Error initiating payment for user ${userId}:`, error);
      throw error;
    }
  }

  static async getPaymentHistory(userId: number): Promise<PaymentType[]> {
    try {
      const payments = await Payment.findAll({ where: { userId } });
      return payments.map(payment => payment.toJSON() as PaymentType);
    } catch (error) {
      logger.error(`Error fetching payment history for user ${userId}:`, error);
      throw error;
    }
  }

  static async syncOfflinePayments(userId: number, offlinePayments: OfflinePayment[]): Promise<void> {
    try {
      const createdPayments = await Payment.bulkCreate(
        offlinePayments.map(payment => ({
          userId,
          amount: payment.amount,
          status: 'completed' as const,
          createdAt: new Date(payment.date)
        }))
      );
      logger.info(`Synced ${createdPayments.length} offline payments for user ${userId}`);
    } catch (error) {
      logger.error(`Error syncing offline payments for user ${userId}:`, error);
      throw error;
    }
  }
}

