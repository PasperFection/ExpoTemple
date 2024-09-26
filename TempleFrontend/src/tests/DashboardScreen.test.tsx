import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DashboardScreen from '../screens/DashboardScreen';
import { AuthProvider } from '../contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

// Uitleg: We maken een mock van de AuthContext om de juiste waarden te kunnen injecteren
const mockAuthContext = {
  user: { email: 'test@example.com' },
  logout: jest.fn(),
  isLoading: false,
};

jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => mockAuthContext,
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Uitleg: We maken een wrapper component om de AuthContext te voorzien
// Deze component zorgt ervoor dat we de juiste context en navigatie kunnen simuleren in onze tests
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>
    <AuthProvider>
      {children}
    </AuthProvider>
  </NavigationContainer>
);

// Uitleg voor beginners:
// We hebben de 'value' prop verwijderd van de AuthProvider component.
// De AuthProvider component verwacht geen 'value' prop, maar gebruikt intern
// de context die we eerder hebben gemockt met useAuth.

// Tips:
// 1. Controleer altijd de props die een component verwacht in de documentatie of broncode.
// 2. Bij het gebruik van context providers in tests, is het vaak beter om de context te mocken
//    op een hoger niveau (zoals we doen met useAuth) in plaats van props door te geven.
// 3. Als je TypeScript errors krijgt over props, kijk dan goed naar de interface of type definitie
//    van de component om te zien welke props verwacht worden.

// Tips voor beginners:
// 1. Gebruik altijd een wrapper component in je tests om de juiste context te simuleren
// 2. Zorg ervoor dat je de juiste imports hebt voor alle gebruikte componenten en functies
// 3. Het is belangrijk om de AuthProvider te gebruiken in plaats van direct AuthContext.Provider
//    om consistentie te behouden met de rest van de applicatie

describe('DashboardScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <DashboardScreen navigation={mockNavigate} />
        </AuthProvider>
      </NavigationContainer>
    );

    expect(getByText('Welcome, test@example.com')).toBeTruthy();
    expect(getByText('Go to Payment')).toBeTruthy();
    expect(getByText('View Payment History')).toBeTruthy();
    expect(getByText('View Profile')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('navigates to Payment screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <DashboardScreen navigation={undefined} />
        </AuthProvider>
      </NavigationContainer>
    );

    fireEvent.press(getByText('Go to Payment'));
    expect(mockNavigate).toHaveBeenCalledWith('Payment');
  });

  it('logs out user', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <DashboardScreen navigation={undefined} />
        </AuthProvider>
      </NavigationContainer>
    );

    fireEvent.press(getByText('Logout'));
    expect(require('../contexts/AuthContext').useAuth().logout).toHaveBeenCalled();
  });
});

export default DashboardScreen;