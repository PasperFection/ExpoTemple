import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../navigation/DrawerNavigator';

describe('DrawerNavigator', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );

    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Payment')).toBeTruthy();
    expect(getByText('Payment History')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });
});