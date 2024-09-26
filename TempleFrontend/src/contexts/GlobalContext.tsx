import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshTokenService } from '../services/auth';
import logger from '../utils/logger';
import { useAuth } from './AuthContext';

// Interface voor de globale context type
interface GlobalContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isOffline: boolean;
  setIsOffline: (isOffline: boolean) => void;
  refreshAuthToken: () => Promise<void>;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

// Creëer de globale context
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// GlobalProvider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { user } = useAuth();
  // Effect voor het monitoren van de netwerkstatus
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
      setIsOnline(state.isConnected ?? true);
    });

    // Load dark mode preference
    AsyncStorage.getItem('isDarkMode').then(value => {
      if (value !== null) {
        setIsDarkMode(JSON.parse(value));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Effect voor het opslaan van de dark mode preference
  useEffect(() => {
    AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Functie voor het vernieuwen van de auth token
  const refreshAuthToken = async () => {
    try {
      const newToken = await refreshTokenService(
        user?.token || ''
      );
      await AsyncStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Token vernieuwing mislukt:', error);
      setError('Kon de authenticatie niet vernieuwen. Probeer opnieuw in te loggen.');
    }
  };

  const handleError = async (error: Error) => {
    await logger.error(error);
    setError(error.message);
  };

  return (
    <GlobalContext.Provider value={{ 
      isLoading, 
      setIsLoading, 
      error, 
      setError, 
      isOffline, 
      setIsOffline,
      refreshAuthToken,
      isDarkMode,
      setIsDarkMode,
      isOnline,
      setIsOnline
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook voor het gebruiken van de globale context
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal moet gebruikt worden binnen een GlobalProvider');
  }
  return context;
};

// Uitleg:
// - We hebben de GlobalContext uitgebreid met isOffline, refreshAuthToken en isDarkMode.
// - NetInfo wordt gebruikt om de netwerkstatus te monitoren.
// - refreshAuthToken functie is toegevoegd om de authenticatie token te vernieuwen.
// - AsyncStorage wordt gebruikt om de nieuwe token op te slaan.
// - Foutafhandeling is verbeterd met meer specifieke error berichten.
// - isDarkMode wordt toegevoegd om de dark mode instelling te ondersteunen.

// Tips:
// - Zorg ervoor dat je de juiste imports hebt in andere componenten die useGlobal gebruiken.
// - Overweeg om een aparte functie te maken voor het ophalen van de token uit AsyncStorage.
// - Je kunt de isOffline status gebruiken in componenten om offline functionaliteit te implementeren.