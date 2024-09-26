import React, { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { GlobalProvider, useGlobal } from '../contexts/GlobalContext';

// Beschrijft de test suite voor GlobalContext
describe('GlobalContext', () => {
  // Test om te controleren of de laadstatus correct wordt ingesteld en opgehaald
  it('should set and get loading state', () => {
    // Wrapper component om de GlobalProvider te gebruiken
    const wrapper: React.FC = ({ children }: { children: ReactNode }) => (
      <GlobalProvider>{children}</GlobalProvider>
    );

    // Render de hook met de wrapper
    const { result } = renderHook(() => useGlobal(), { wrapper });

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should set and get error state', () => {
    const wrapper: React.FC = ({ children }: { children: ReactNode }) => (
      <GlobalProvider>{children}</GlobalProvider>
    );

    const { result } = renderHook(() => useGlobal(), { wrapper });

    expect(result.current.error).toBeNull();

    act(() => {
      result.current.setError('Test error');
    });

    expect(result.current.error).toBe('Test error');
  });
});