    // Start of Selection
    import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { login, register, logout, refreshToken } from '../services/auth';
    import { User } from '../types/user';
    
    interface AuthContextType {
      user: User | null;
      login: (email: string, password: string) => Promise<void>;
      register: (email: string, password: string) => Promise<void>;
      logout: () => Promise<void>;
      refreshToken: () => Promise<void>;
      isLoading: boolean;
    }
    
    // Dit is de AuthContext die gedeeld wordt over de hele applicatie
    export const AuthContext = createContext<AuthContextType | undefined>(undefined);
    
    // AuthProvider zorgt voor de beschikbaarheid van AuthContext in de applicatie
    export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);
      const [isLoading, setIsLoading] = useState(true);
    
      // Deze effect controleert of de gebruiker al ingelogd is bij het laden van de app
      useEffect(() => {
        checkUserLoggedIn();
      }, []);
    
      // Functie om te controleren of er een ingelogde gebruiker is opgeslagen
      const checkUserLoggedIn = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.error('Error checking user login status:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      // Functie om de gebruiker in te loggen
      const loginUser = async (email: string, password: string) => {
        try {
          const userData = await login(email, password);
          setUser(userData);
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      };
    
      // Functie om een nieuwe gebruiker te registreren
      const registerUser = async (email: string, password: string) => {
        try {
          const userData = await register(email, password);
          setUser(userData);
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      };
    
      // Functie om de gebruiker uit te loggen
      const logoutUser = async () => {
        try {
          await logout();
          setUser(null);
          await AsyncStorage.removeItem('user');
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
      };
    
      // Functie om het auth token van de gebruiker te vernieuwen
      const refreshUserToken = async () => {
        try {
          if (user && user.token) {
            const newToken = await refreshToken(user.token);
            const updatedUser = { ...user, token: newToken };
            setUser(updatedUser);
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Behandel de fout, bijvoorbeeld door de gebruiker uit te loggen als vernieuwing mislukt
          await logoutUser();
        }
      };
    
      return (
        <AuthContext.Provider value={{ 
          user, 
          login: loginUser, 
          register: registerUser, 
          logout: logoutUser,
          refreshToken: refreshUserToken,
          isLoading 
        }}>
          {children}
        </AuthContext.Provider>
      );
    };
    
    // Hook om de AuthContext gemakkelijk te gebruiken in componenten
    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };