import React, { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { login, register, logout, refreshToken } from '../services/auth';

jest.mock('../services/auth');

// Beschrijft de test suite voor AuthContext
describe('AuthContext', () => {
  // Test om te controleren of de gebruiker correct kan inloggen
  it('should login user', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    (login as jest.Mock).mockResolvedValue(mockUser);
    
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('test@example.com', 'password');
    });

    await waitForNextUpdate();

    expect(result.current.user).toEqual(mockUser);
  });

  // Add more tests for other AuthContext functions
});