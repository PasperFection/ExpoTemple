# ExpoTemplate
Template voor het bouwen van React Native apps op Expo

# Table of Contents

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

# Inhoud

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
   