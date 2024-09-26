import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { OfflinePaymentProvider, useOfflinePayment } from '../contexts/OfflinePaymentContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-native-community/netinfo');

describe('OfflinePaymentContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with zero offline payments', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <OfflinePaymentProvider>{children}</OfflinePaymentProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useOfflinePayment(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.offlinePayments).toBe(0);
  });

  // ... andere tests blijven hetzelfde
});