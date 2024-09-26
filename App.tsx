import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { PaymentProvider } from './src/contexts/PaymentContext';
import { GlobalProvider } from './src/contexts/GlobalContext';
import { OfflinePaymentProvider } from './src/contexts/OfflinePaymentContext';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GlobalProvider>
        <AuthProvider>
          <PaymentProvider>
            <OfflinePaymentProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </OfflinePaymentProvider>
          </PaymentProvider>
        </AuthProvider>
      </GlobalProvider>
    </ErrorBoundary>
  );
};

export default App;
