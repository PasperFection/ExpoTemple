import React from 'react';
import { render } from '@testing-library/react-native';
import UserProfile from '../components/UserProfile';
import { AuthProvider } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    user: { id: '1', email: 'test@example.com' },
  }),
}));

describe('UserProfile', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <AuthProvider>
        <UserProfile />
      </AuthProvider>
    );

    expect(getByText('User Profile')).toBeTruthy();
    expect(getByText('Email: test@example.com')).toBeTruthy();
    expect(getByText('ID: 1')).toBeTruthy();
  });
});