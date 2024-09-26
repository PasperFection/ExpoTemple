import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../navigation/AppNavigator';
import { AuthProvider } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    user: null,
  }),
}));

describe('AppNavigator', () => {
  it('renders login screen when user is not authenticated', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    );

    expect(getByText('Login')).toBeTruthy();
  });

  it('renders main screen when user is authenticated', () => {
    jest.spyOn(require('../contexts/AuthContext'), 'useAuth').mockImplementation(() => ({
      user: { id: '1', email: 'test@example.com' },
    }));

    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    );

    expect(getByText('Dashboard')).toBeTruthy();
  });
});