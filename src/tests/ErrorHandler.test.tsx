import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorHandler from '../components/ErrorHandler';
import { GlobalProvider } from '../contexts/GlobalContext';

jest.mock('../contexts/GlobalContext', () => ({
  ...jest.requireActual('../contexts/GlobalContext'),
  useGlobal: () => ({
    error: 'Test error',
    setError: jest.fn(),
  }),
}));

describe('ErrorHandler', () => {
  it('renders error message', () => {
    const { getByText } = render(
      <GlobalProvider>
        <ErrorHandler />
      </GlobalProvider>
    );

    expect(getByText('Test error')).toBeTruthy();
  });

  it('calls setError when dismiss button is pressed', () => {
    const { getByText } = render(
      <GlobalProvider>
        <ErrorHandler />
      </GlobalProvider>
    );

    fireEvent.press(getByText('Dismiss'));
    expect(require('../contexts/GlobalContext').useGlobal().setError).toHaveBeenCalledWith(null);
  });
});