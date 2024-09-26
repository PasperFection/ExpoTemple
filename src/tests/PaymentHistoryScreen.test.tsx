import React from 'react';
import { render } from '@testing-library/react-native';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import { PaymentProvider } from '../contexts/PaymentContext';

jest.mock('../components/PaymentHistory', () => {
  return function MockedPaymentHistory() {
    return <div>Mocked Payment History</div>;
  };
});

describe('PaymentHistoryScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PaymentProvider>
        <PaymentHistoryScreen />
      </PaymentProvider>
    );

    expect(getByText('Mocked Payment History')).toBeTruthy();
  });
});