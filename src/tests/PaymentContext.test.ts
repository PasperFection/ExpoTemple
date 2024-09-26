import { renderHook, act } from '@testing-library/react-hooks';
import { PaymentProvider, usePayment } from '../contexts/PaymentContext';
import { initiatePaymentService, getPaymentHistoryService } from '../services/payment';
import { AppError } from '../utils/errorHandling';

jest.mock('../services/payment');

describe('PaymentContext', () => {
  it('should initiate payment successfully', async () => {
    (initiatePaymentService as jest.Mock).mockResolvedValue({});
    (getPaymentHistoryService as jest.Mock).mockResolvedValue([]);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PaymentProvider>{children}</PaymentProvider>
    );

    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      await result.current.initiatePayment(100);
    });

    expect(initiatePaymentService).toHaveBeenCalledWith(100);
    expect(getPaymentHistoryService).toHaveBeenCalled();
  });

  it('should handle payment initiation error', async () => {
    (initiatePaymentService as jest.Mock).mockRejectedValue(new AppError('PAYMENT_FAILED', 'Payment failed'));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PaymentProvider>{children}</PaymentProvider>
    );

    const { result } = renderHook(() => usePayment(), { wrapper });

    await expect(result.current.initiatePayment(100)).rejects.toThrow('Payment failed');
  });

  it('should get payment history', async () => {
    const mockHistory = [{ id: '1', amount: 100, status: 'completed', date: '2023-06-01' }];
    (getPaymentHistoryService as jest.Mock).mockResolvedValue(mockHistory);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PaymentProvider>{children}</PaymentProvider>
    );

    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      await result.current.getPaymentHistory();
    });

    expect(getPaymentHistoryService).toHaveBeenCalled();
    expect(result.current.paymentHistory).toEqual(mockHistory);
  });
});