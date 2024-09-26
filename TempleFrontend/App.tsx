import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { PaymentProvider } from './src/contexts/PaymentContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PaymentProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaymentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
