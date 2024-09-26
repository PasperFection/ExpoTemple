import { renderHook, act } from '@testing-library/react-hooks';
import { GlobalProvider, useGlobal } from '../contexts/GlobalContext';

describe('GlobalContext', () => {
  it('should set and get loading state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GlobalProvider>{children}</GlobalProvider>
    );

    const { result } = renderHook(() => useGlobal(), { wrapper });

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should set and get error state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
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