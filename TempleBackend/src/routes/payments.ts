import express, { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/PaymentService';
import { initiatePaymentSchema, syncOfflinePaymentsSchema } from '../schemas/payment.schema';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import logger from '../utils/logger';

/* 
    Definieert de router en de initiatie endpoint voor betalingen met juiste type ondersteuning
*/
const router = express.Router();

router.post(
    '/initiate',
    authenticateToken,
    validateRequest(initiatePaymentSchema),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { amount } = req.body;
            const userId = req.user.id;
        const payment = await PaymentService.initiatePayment(userId, amount);
        logger.info(`Payment initiated for user ${userId}: ${JSON.stringify(payment)}`);
        res.status(201).json(payment);
    } catch (error) {
        logger.error(`Error initiating payment: ${error}`);
        next(error);
    }
});

router.get('/history', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const payments = await PaymentService.getPaymentHistory(userId);
        logger.info(`Payment history retrieved for user ${userId}`);
        res.status(200).json(payments);
    } catch (error) {
        logger.error(`Error retrieving payment history: ${error}`);
        next(error);
    }
});

router.post('/sync-offline', authenticateToken, validateRequest(syncOfflinePaymentsSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { offlinePayments } = req.body;
        await PaymentService.syncOfflinePayments(userId, offlinePayments);
        logger.info(`Offline payments synced for user ${userId}`);
        res.status(200).json({ message: 'Offline payments synced successfully' });
    } catch (error) {
        logger.error(`Error syncing offline payments: ${error}`);
        next(error);
    }
});

export default router;