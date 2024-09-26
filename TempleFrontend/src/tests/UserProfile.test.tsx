import React from 'react';
import { render } from '@testing-library/react-native';
import UserProfile from '../components/UserProfile';

describe('UserProfile', () => {
  it('renders correctly', () => {
    const user = { id: '1', email: 'test@example.com' };
    const { getByText } = render(<UserProfile user={user} isOffline={false} />);
    
    expect(getByText('Email: test@example.com')).toBeTruthy();
    expect(getByText('Status: Online')).toBeTruthy();
  });

  it('shows offline status when isOffline is true', () => {
    const user = { id: '1', email: 'test@example.com' };
    const { getByText } = render(<UserProfile user={user} isOffline={true} />);
    
    expect(getByText('Status: Offline')).toBeTruthy();
  });
});