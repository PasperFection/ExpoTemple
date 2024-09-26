import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorBoundary from '../components/ErrorBoundary';
import { GlobalProvider } from '../contexts/GlobalContext';
import { View, Text } from 'react-native';

const ErrorComponent: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const { getByText } = render(
      <GlobalProvider>
        <ErrorBoundary>
          <View>
            <Text>Test Child</Text>
          </View>
        </ErrorBoundary>
      </GlobalProvider>
    );

    expect(getByText('Test Child')).toBeTruthy();
  });

  // ... andere tests blijven hetzelfde
});