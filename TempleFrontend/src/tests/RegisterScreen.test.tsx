import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthProvider } from '../contexts/AuthContext';
import { GlobalProvider } from '../contexts/GlobalContext';

jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    register: jest.fn(),
  }),
}));

jest.mock('../contexts/GlobalContext', () => ({
  ...jest.requireActual('../contexts/GlobalContext'),
  useGlobal: () => ({
    setError: jest.fn(),
  }),
}));

describe('RegisterScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <GlobalProvider>
        <AuthProvider>
          <RegisterScreen />
        </AuthProvider>
      </GlobalProvider>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('shows error for invalid email', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <GlobalProvider>
        <AuthProvider>
          <RegisterScreen />
        </AuthProvider>
      </GlobalProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Register'));

    const errorMessage = await findByText('Invalid email address');
    expect(errorMessage).toBeTruthy();
  });

  it('shows error for password mismatch', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <GlobalProvider>
        <AuthProvider>
          <RegisterScreen />
        </AuthProvider>
      </GlobalProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password456');
    fireEvent.press(getByText('Register'));

    const errorMessage = await findByText('Passwords do not match');
    expect(errorMessage).toBeTruthy();
  });
});