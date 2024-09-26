# Projectstructuur

Temple/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorHandler.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── PaymentHistory.tsx
│   │   └── UserProfile.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── GlobalContext.tsx
│   │   ├── OfflinePaymentContext.tsx
│   │   └── PaymentContext.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── DrawerNavigator.tsx
│   ├── screens/
│   │   ├── DashboardScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── PaymentHistoryScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── services/
│   │   ├── auth.ts
│   │   └── payment.ts
│   ├── tests/
│   │   ├── AuthContext.test.ts
│   │   └── PaymentContext.test.ts
│   └── utils/
│       ├── constants.ts
│       ├── formatters.ts
│       ├── offlineSync.ts
│       └── validators.ts
├── .env
├── App.tsx
├── app.json
├── package.json
└── tsconfig.json

## Belangrijke bestanden en mappen

- `src/components/`: Herbruikbare UI-componenten
- `src/contexts/`: React Context providers voor state management
- `src/navigation/`: Navigatielogica en -configuratie
- `src/screens/`: Hoofdschermen van de app
- `src/services/`: API-services voor authenticatie en betalingen
- `src/tests/`: Unit tests
- `src/utils/`: Hulpfuncties en constanten
- `App.tsx`: Hoofdcomponent van de app
- `.env`: Omgevingsvariabelen (niet ingecheckt in version control)