import React from 'react';
import { render } from '@testing-library/react-native';
import PaymentHistory from '../components/PaymentHistory';
import { PaymentProvider } from '../contexts/PaymentContext';

jest.mock('../contexts/PaymentContext', () => ({
  ...jest.requireActual('../contexts/PaymentContext'),
  usePayment: () => ({
    paymentHistory: [
      { id: '1', amount: 100, status: 'completed', date: '2023-06-01' },
      { id: '2', amount: 200, status: 'pending', date: '2023-06-02' },
    ],
  }),
}));

describe('PaymentHistory', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PaymentProvider>
        <PaymentHistory />
      </PaymentProvider>
    );

    expect(getByText('Payment History')).toBeTruthy();
    expect(getByText('Amount: € 100,00')).toBeTruthy();
    expect(getByText('Status: completed')).toBeTruthy();
    expect(getByText('Amount: € 200,00')).toBeTruthy();
    expect(getByText('Status: pending')).toBeTruthy();
  });
});