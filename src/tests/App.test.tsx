import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../src/navigation/AppNavigator', () => {
  return function MockedAppNavigator() {
    return <div>Mocked App Navigator</div>;
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Mocked App Navigator')).toBeTruthy();
  });
});