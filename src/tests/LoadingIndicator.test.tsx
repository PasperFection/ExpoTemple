import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingIndicator from '../components/LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<LoadingIndicator />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});