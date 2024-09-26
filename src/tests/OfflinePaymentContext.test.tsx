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
    AsyncStorage.getItem.mockResolvedValue(null);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <OfflinePaymentProvider>{children}</OfflinePaymentProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useOfflinePayment(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.offlinePayments).toBe(0);
  });

  it('adds offline payment', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <OfflinePaymentProvider>{children}</OfflinePaymentProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useOfflinePayment(), { wrapper });

    await waitForNextUpdate();

    await act(async () => {
      await result.current.addOfflinePayment(100);
    });

    expect(result.current.offlinePayments).toBe(1);
  });

  it('syncs payments when online', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([{ amount: 100 }]));
    (NetInfo.addEventListener as jest.Mock).mockImplementation((callback) => {
      callback({ isConnected: true });
      return jest.fn();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <OfflinePaymentProvider>{children}</OfflinePaymentProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useOfflinePayment(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.offlinePayments).toBe(0);
  });
});