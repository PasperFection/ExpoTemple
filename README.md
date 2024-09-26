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


Zorg voor correcte datamodellen en API-eindpunten voor het beheren van gebruikers en betalingen, en implementeer webhook callbacks om de status van betalingen te verwerken.

---

Met dit overzicht heb je een duidelijke structuur en een concreet plan om de app op te bouwen. Elk onderdeel kan worden aangepast en uitgebreid, zodat de app schaalbaar en flexibel blijft.
