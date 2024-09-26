import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import { AuthProvider } from '../contexts/AuthContext';
import { GlobalProvider } from '../contexts/GlobalContext';

jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock('../contexts/GlobalContext', () => ({
  ...jest.requireActual('../contexts/GlobalContext'),
  useGlobal: () => ({
    setError: jest.fn(),
  }),
}));

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <GlobalProvider>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </GlobalProvider>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('shows error for invalid email', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <GlobalProvider>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </GlobalProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    const errorMessage = await findByText('Invalid email address');
    expect(errorMessage).toBeTruthy();
  });
});