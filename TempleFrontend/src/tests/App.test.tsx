import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Importeer de AuthProvider om de App-component te wrappen
import { AuthProvider } from '../contexts/AuthContext';

// Mock de AuthProvider
jest.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock de PaymentProvider
jest.mock('../contexts/PaymentContext', () => ({
  PaymentProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock de GlobalProvider
jest.mock('../contexts/GlobalContext', () => ({
  GlobalProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock de OfflinePaymentProvider
jest.mock('../contexts/OfflinePaymentContext', () => ({
  OfflinePaymentProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock de ErrorBoundary
jest.mock('../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock de AppNavigator
jest.mock('../navigation/AppNavigator', () => ({
  __esModule: true,
  default: () => <div>Mocked App Navigator</div>,
}));

/**
 * Deze sectie bevat de benodigde imports en mocks voor het testen van de App-component.
 * 
 * Uitleg:
 * - We importeren React en de render-functie van @testing-library/react-native voor het renderen en testen van componenten.
 * - We importeren de App-component die we gaan testen.
 * - We mocken de NavigationContainer om navigatie-gerelateerde fouten te voorkomen tijdens het testen.
 * - We importeren en mocken de AuthProvider om de authenticatiecontext te simuleren.
 * - We mocken de API-functies om netwerkaanroepen te voorkomen tijdens het testen.
 * 
 * Tip: Zorg ervoor dat je altijd de juiste paden gebruikt bij het importeren van componenten en functies.
 * Als je problemen ondervindt met imports, controleer dan of de bestandsstructuur correct is.
 */

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Mocked App Navigator')).toBeTruthy();
  });
});