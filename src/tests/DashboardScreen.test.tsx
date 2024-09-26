import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DashboardScreen from '../screens/DashboardScreen';
import { AuthProvider } from '../contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    user: { email: 'test@example.com' },
    logout: jest.fn(),
    isLoading: false,
  }),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('DashboardScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <DashboardScreen />
        </AuthProvider>
      </NavigationContainer>
    );

    expect(getByText('Welcome, test@example.com')).toBeTruthy();
    expect(getByText('Go to Payment')).toBeTruthy();
    expect(getByText('View Payment History')).toBeTruthy();
    expect(getByText('View Profile')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('navigates to Payment screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <DashboardScreen />
        </AuthProvider>
      </NavigationContainer>
    );

    fireEvent.press(getByText('Go to Payment'));
    expect(mockNavigate).toHaveBeenCalledWith('Payment');
  });

  it('logs out user', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <DashboardScreen />
        </AuthProvider>
      </NavigationContainer>
    );

    fireEvent.press(getByText('Logout'));
    expect(require('../contexts/AuthContext').useAuth().logout).toHaveBeenCalled();
  });
});