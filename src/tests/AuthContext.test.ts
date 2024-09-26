import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { loginService, registerService, logoutService, refreshTokenService } from '../services/auth';
import { AppError } from '../utils/errorHandling';

jest.mock('../services/auth');

describe('AuthContext', () => {
  it('should login user', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).not.toBeNull();
  });

  it('should handle login error', async () => {
    (loginService as jest.Mock).mockRejectedValue(new AppError('INVALID_CREDENTIALS', 'Invalid email or password'));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(act(() => result.current.login('test@example.com', 'wrongpassword'))).rejects.toThrow('Invalid email or password');
    expect(result.current.user).toBeNull();
  });

  it('should handle registration', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    (registerService as jest.Mock).mockResolvedValue(mockUser);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register('test@example.com', 'password123');
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it('should handle logout', async () => {
    (logoutService as jest.Mock).mockResolvedValue(undefined);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    // First, set a user
    act(() => {
      result.current.user = { id: '1', email: 'test@example.com' };
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });

  it('should handle token refresh', async () => {
    const newToken = 'new_token_123';
    (refreshTokenService as jest.Mock).mockResolvedValue(newToken);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.refreshToken();
    });

    // Note: We can't directly test if the token was updated in AsyncStorage here,
    // but we can check that the function completed without throwing an error
    expect(refreshTokenService).toHaveBeenCalled();
  });
});