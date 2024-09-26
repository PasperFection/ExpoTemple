# ExpoTemple

Een template voor het bouwen van React Native apps met Expo, inclusief authenticatie, betalingen, en offline functionaliteit.

# Inhoudsopgave

- [Benodigde Functies](#benodigde-functies)
  - [1. Authenticatie & Autorisatie](#1-authenticatie-autorisatie)
  - [2. Database-integratie](#2-database-integratie)
  - [3. Betalingssysteem Integratie](#3-betalingssysteem-integratie)
  - [4. Componenten](#4-componenten)
  - [5. Routes en Navigatie](#5-routes-en-navigatie)
  - [6. State Management & Contexts](#6-state-management-contexts)
  - [7. Constanten & Configuraties](#7-constanten-configuraties)
  - [8. Tests en Validaties](#8-tests-en-validaties)
  - [9. Documentatie](#9-documentatie)
  - [10. Best Practices & Uitbreidbaarheid](#10-best-practices-uitbreidbaarheid)

## Installatie

1. Clone de repository
2. Run `npm install` of `yarn install`
3. Kopieer `.env.example` naar `.env` en vul de juiste waarden in
4. Run `expo start` om de app te starten

## Omgevingsvariabelen

Zorg ervoor dat je de volgende omgevingsvariabelen instelt in je `.env` bestand:

- `API_URL`: De URL van je backend API
- `SUPABASE_URL`: De URL van je Supabase project (indien van toepassing)
- `SUPABASE_KEY`: Je Supabase API key (indien van toepassing)
- `STRIPE_SECRET_KEY`: Je Stripe secret key (indien van toepassing)
- `JWT_SECRET`: Een geheim voor het ondertekenen van JWT tokens

## Scripts

- `npm start` of `yarn start`: Start de Expo development server
- `npm test` of `yarn test`: Voer de tests uit

## Projectstructuur

Zie `STRUCTURE.md` voor een gedetailleerd overzicht van de projectstructuur.

## Overwegingen

Zie `CONSIDERATIONS.md` voor belangrijke overwegingen bij het gebruik van deze template.
### 1. **Authenticatie & Autorisatie**
   - **Inlogfunctionaliteit**:
     - Gebruik van JWT (JSON Web Tokens) voor het opslaan van sessies.
     - Formulier voor gebruikersnaam/e-mailadres en wachtwoord.
     - Optioneel: OAuth-login (Google, Facebook, etc.).
   - **Registratie**:
     - Validatie van gegevens (bijv. wachtwoordlengte, e-mailvalidatie).
     - Opslag van nieuwe gebruikers in de database.
   - **Uitlogfunctie**:
     - Verwijderen van token/sessie bij uitloggen.
   - **Wachtwoordherstel**:
     - Functie voor het resetten van wachtwoorden via een e-mail of SMS-token.
     - Formulier voor het invoeren van een nieuw wachtwoord.

### 2. **Database-integratie (PostgreSQL, Supabase, Firebase, Mongoose, etc.)**
   - **Koppeling met Postgres (bijv. via Supabase of Docker)**
     - Configuratie van de databaseverbinding.
     - Setup van Prisma of Sequelize als ORM voor database interacties.
   - **Database modellen**:
     - Model voor gebruikers: `users`
     - Model voor sessies/tokens: `sessions`
     - Opslag van betalingsgegevens en ordergeschiedenis.
   - **API voor CRUD-functies**:
     - Gebruikersinformatie ophalen, bijwerken, verwijderen.

### 3. **Betalingssysteem Integratie**
   - **Koppeling met payment providers**:
     - Stripe, Mollie, Adyen, etc.
     - Configuratie van webhook voor betalingsbevestigingen.
     - Functie om betalingen te starten en gebruikers te redirecten naar de betaalprovider.
   - **Orderbeheer**:
     - Model voor orders/payments in de database.
     - Mogelijkheid om succes- en faalpagina's te tonen na betaling.

### 4. **Componenten**
   - **Formulieren**:
     - Login-formulier.
     - Registratie-formulier.
     - Wachtwoord-herstel-formulier.
   - **Knoppen**:
     - Betalingsknop die verbindt met de gekozen provider.
   - **Navigatie**:
     - Een navigatiebalk voor navigatie tussen verschillende pagina’s zoals Home, Account, Betalingen, etc.
   - **Gebruikersprofiel**:
     - Pagina voor gebruikers om hun accountgegevens te beheren (bijv. wachtwoord wijzigen, persoonlijke info bijwerken).
   - **Betalingsgeschiedenis**:
     - Component dat de ordergeschiedenis en transacties weergeeft.

### 5. **Routes en Navigatie**
   - Gebruik van **React Navigation** voor het maken van routes:
     - **Publieke routes**: login, registratie, wachtwoordherstel.
     - **Beveiligde routes**: dashboard, profielpagina, betalingsgeschiedenis.
   - **Middleware** voor het beveiligen van routes (bijv. alleen toegang als je bent ingelogd).

### 6. **State Management & Contexts**
   - **Context voor authenticatie**:
     - Voor het beheren van de huidige gebruikerssessie, inloggen/uitloggen, etc.
   - **Context voor betalingen**:
     - Beheer van betalingsinformatie en orderstatus.
   - **Globale context voor statusbeheer**:
     - Gebruik van een state management library zoals Redux of React Context API.

### 7. **Constanten & Configuraties**
   - **API eindpunten**:
     - Configuratie van de backend API voor authenticatie, betalingen, etc.
   - **JWT secret**:
     - Opslag van de JWT-sleutel voor sessiebeheer.
   - **Payment provider configuraties**:
     - Sleutels en API's voor de gekozen betalingsprovider.
   - **Omgevingsvariabelen**:
     - Beheer van sleutels en configuraties via `.env`-bestanden.

### 8. **Tests en Validaties**
   - **Eenheidstests** voor componenten zoals formulieren.
   - **Integratietests** voor het betalingsproces en authenticatie.
   - **Inputvalidaties**:
     - Bijv. wachtwoorden moeten voldoen aan eisen zoals minimaal aantal tekens.

### 9. **Documentatie**
   - **Setup gids**:
     - Instructies voor het opzetten van de app en het configureren van externe diensten.
   - **Handleiding voor uitbreidingen**:
     - Hoe eenvoudig nieuwe componenten of pagina's kunnen worden toegevoegd.

### 10. **Best Practices en uitbreidbaarheid**
   - Gebruik van **TypeScript** voor typeveiligheid.
   - **Modulaire structuur** voor eenvoudiger onderhoud en uitbreidingen.
   - Ondersteuning voor **dark mode** en toegankelijkheidsopties.
   
   Hier is een duidelijk overzicht van de structuur en componenten van het template die je nodig hebt om de app op te bouwen. Dit is een stap-voor-stap plan met alle elementen die nodig zijn:

---
### 1. **Project Structuur**
Dit is de basisstructuur van je app met alle benodigde mappen en bestanden:

```bash
expo-go-app/
│
├── src/
│   ├── components/
│   │   ├── AuthForm.js      # Herbruikbaar inlog-/registratieformulier
│   │   ├── PaymentButton.js # Betalingsknopcomponent
│   │   ├── Profile.js       # Gebruikersprofiel component
│   │   └── OrderHistory.js  # Geschiedenis van betalingen/transactions
│   │
│   ├── contexts/
│   │   ├── AuthContext.js    # Beheer van gebruikersauthenticatie
│   │   ├── PaymentContext.js # Beheer van betalingen en orderstatus
│   │   └── GlobalContext.js  # Algemene state management voor de app
│   │
│   ├── navigation/
│   │   └── AppNavigator.js   # Hoofd navigatie voor publieke en beveiligde routes
│   │
│   ├── screens/
│   │   ├── LoginScreen.js         # Login pagina
│   │   ├── RegisterScreen.js      # Registratie pagina
│   │   ├── PasswordResetScreen.js # Wachtwoord herstel pagina
│   │   ├── DashboardScreen.js     # Beveiligde dashboard pagina
│   │   ├── PaymentScreen.js       # Betaling scherm
│   │   ├── ProfileScreen.js       # Gebruikersprofiel pagina
│   │   └── OrderHistoryScreen.js  # Geschiedenis van betalingen
│   │
│   ├── services/
│   │   ├── api.js           # API voor interacties met backend/database
│   │   ├── auth.js          # Logica voor authenticatie (login, registratie, etc.)
│   │   ├── payment.js       # Betalingsverwerking (Stripe, Mollie, etc.)
│   │   └── database.js      # Koppeling met database (Postgres, Firebase, etc.)
│   │
│   ├── utils/
│   │   ├── constants.js     # Globale constanten zoals API URL, JWT-secret
│   │   └── validators.js    # Validatiefuncties voor formulieren (bijv. wachtwoordvalidatie)
│   │
│   └── App.js               # Hoofdbestand van de app waar alles samenkomt
│
├── .env                     # Omgevingsvariabelen voor API-sleutels, database credentials, etc.
├── package.json             # Project afhankelijkheden en scripts
├── README.md                # Documentatie van het project
└── app.json                 # Expo config bestand
```

---
### 2. **Belangrijke Componenten**

#### **a) AuthForm.js**
Dit component wordt hergebruikt voor zowel het inlog- als registratieformulier.

```jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AuthForm = ({ isLogin }) => {
    const { login, register } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = () => {
        if (isLogin) {
            login(email, password);
        } else {
            register(email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
    );
};

export default AuthForm;
```

#### **b) PaymentButton.js**
Dit component regelt betalingen via de gekozen provider (Stripe, Mollie, etc.).

```jsx
import React, { useContext } from 'react';
import { PaymentContext } from '../contexts/PaymentContext';

const PaymentButton = ({ amount }) => {
    const { initiatePayment } = useContext(PaymentContext);

    const handlePayment = () => {
        initiatePayment(amount);
    };

    return (
        <button onClick={handlePayment}>
            Pay ${amount}
        </button>
    );
};

export default PaymentButton;
```

---
### 3. **Navigatie (AppNavigator.js)**

Gebruik `React Navigation` om zowel publieke als beveiligde routes te beheren:

```jsx
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

---
### 4. **Contexten voor State Management**

#### **a) AuthContext.js**
Beheer van authenticatiestatus en acties (inloggen, uitloggen, registreren).

```jsx
import React, { createContext, useState } from 'react';
import { loginService, registerService } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const loggedInUser = await loginService(email, password);
        setUser(loggedInUser);
    };

    const register = async (email, password) => {
        const registeredUser = await registerService(email, password);
        setUser(registeredUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
```

#### **b) PaymentContext.js**
Beheer van betalingen en orderstatus.

```jsx
import React, { createContext } from 'react';
import { initiatePaymentService } from '../services/payment';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const initiatePayment = (amount) => {
        initiatePaymentService(amount);
    };

    return (
        <PaymentContext.Provider value={{ initiatePayment }}>
            {children}
        </PaymentContext.Provider>
    );
};
```

---
### 5. **API Koppelingen (services/api.js)**

Hier schrijf je de functies voor communicatie met je backend of database.

```jsx
export const loginService = async (email, password) => {
    // Communicatie met backend voor login
};

export const registerService = async (email, password) => {
    // Communicatie met backend voor registratie
};

export const initiatePaymentService = async (amount) => {
    // Betalingsinitiaties met provider
};
```

### 6. **Gebruikers- en Betalingsbeheer in de Database**

Zorg voor correcte datamodellen en API-eindpunten voor het beheren van gebruikers en betalingen, en implementeer webhook callbacks om de status van betalingen te verwerken.

---

Met dit overzicht heb je een duidelijke structuur en een concreet plan om de app op te bouwen. Elk onderdeel kan worden aangepast en uitgebreid, zodat de app schaalbaar en flexibel blijft.
