import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';
import { AuthProvider } from '../contexts/AuthContext';

jest.mock('../components/UserProfile', () => {
  return function MockedUserProfile() {
    return <div>Mocked User Profile</div>;
  };
});

describe('ProfileScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <AuthProvider>
        <ProfileScreen />
      </AuthProvider>
    );

    expect(getByText('Mocked User Profile')).toBeTruthy();
  });
});