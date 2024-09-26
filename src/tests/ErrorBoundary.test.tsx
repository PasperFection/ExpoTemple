import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorBoundary from '../components/ErrorBoundary';
import { GlobalProvider } from '../contexts/GlobalContext';

const ErrorComponent: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const { getByText } = render(
      <GlobalProvider>
        <ErrorBoundary>
          <Text>Test Child</Text>
        </ErrorBoundary>
      </GlobalProvider>
    );

    expect(getByText('Test Child')).toBeTruthy();
  });

  it('renders error message when there is an error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const { getByText } = render(
      <GlobalProvider>
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </GlobalProvider>
    );

    expect(getByText('Oops! Something went wrong.')).toBeTruthy();
    
    spy.mockRestore();
  });
});