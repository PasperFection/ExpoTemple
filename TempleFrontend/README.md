# Temple

Een template voor het bouwen van React Native apps met Expo, inclusief authenticatie, betalingen, en offline functionaliteit.

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