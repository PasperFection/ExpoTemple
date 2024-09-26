import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PaymentScreen from '../screens/PaymentScreen';
import { PaymentProvider } from '../contexts/PaymentContext';
import { GlobalProvider } from '../contexts/GlobalContext';

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

jest.mock('../contexts/PaymentContext', () => ({
  ...jest.requireActual('../contexts/PaymentContext'),
  usePayment: () => ({
    initiatePayment: jest.fn(),
  }),
}));

jest.mock('../contexts/GlobalContext', () => ({
  ...jest.requireActual('../contexts/GlobalContext'),
  useGlobal: () => ({
    setError: jest.fn(),
  }),
}));

describe('PaymentScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <GlobalProvider>
        <PaymentProvider>
          <PaymentScreen />
        </PaymentProvider>
      </GlobalProvider>
    );

    expect(getByPlaceholderText('Amount')).toBeTruthy();
    expect(getByText('Pay')).toBeTruthy();
  });

  it('initiates payment when online', async () => {
    const { getByPlaceholderText, getByText } = render(
      <GlobalProvider>
        <PaymentProvider>
          <PaymentScreen />
        </PaymentProvider>
      </GlobalProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Amount'), '100');
    fireEvent.press(getByText('Pay'));

    await waitFor(() => {
      expect(require('../contexts/PaymentContext').usePayment().initiatePayment).toHaveBeenCalledWith(100);
    });
  });
});