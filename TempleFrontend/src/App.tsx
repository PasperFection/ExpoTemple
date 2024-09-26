import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { GlobalProvider } from './contexts/GlobalContext';
import { OfflinePaymentProvider } from './contexts/OfflinePaymentContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <AuthProvider>
          <PaymentProvider>
            <OfflinePaymentProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </OfflinePaymentProvider>
          </PaymentProvider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default App;