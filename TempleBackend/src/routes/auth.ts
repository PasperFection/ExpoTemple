import express, { NextFunction, Request, Response } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { registerSchema, loginSchema, refreshTokenSchema, resetPasswordSchema, changePasswordSchema } from '../schemas/auth.schema';
import { register, login, refreshToken, resetPassword, changePassword } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth';

// Uitleg: Creëer een router instance voor het definiëren van routes
const router = express.Router();

// Uitleg: Route voor het registreren van een nieuwe gebruiker met validatie
// Tips:
// - Zorg ervoor dat de validatie-schema correct is om foutieve data te voorkomen
// - Gebruik async/await om asynchrone operaties netjes af te handelen
router.post('/register', authenticateToken, validateRequest(registerSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});

// Uitleg: Route voor het inloggen van een bestaande gebruiker met validatie
// Tips:
// - Valideer inloggegevens grondig om beveiliging te waarborgen
// - Zorg ervoor dat tokens veilig worden gegenereerd en opgeslagen
router.post('/login', authenticateToken, validateRequest(loginSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

// Uitleg: Route voor het vernieuwen van tokens met validatie
// Tips:
// - Gebruik refresh tokens om de sessie van de gebruiker veilig te verlengen
// - Controleer altijd de geldigheid van refresh tokens voordat je nieuwe access tokens uitgeeft
router.post('/refresh-token', authenticateToken, validateRequest(refreshTokenSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await refreshToken(req, res);
    } catch (error) {
        next(error);
    }
});

// Uitleg: Route voor het resetten van wachtwoord met validatie
// Tips:
// - Implementeer een e-mailverificatie om te voorkomen dat niet-geautoriseerde gebruikers wachtwoorden kunnen resetten
router.post('/reset-password', authenticateToken, validateRequest(resetPasswordSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await resetPassword(req, res);
    } catch (error) {
        next(error);
    }
});

// Uitleg: Route voor het wijzigen van wachtwoord met validatie
// Tips:
    // Start of Selection
    // Uitleg: Route voor het wijzigen van het wachtwoord. Zorgt ervoor dat de gebruiker is ingelogd en valideert het oude wachtwoord.
    // Tips:
    // - Gebruik een authenticatiemiddleware om te controleren of de gebruiker is ingelogd
    // - Valideer het oude wachtwoord voordat het nieuwe wordt ingesteld
    router.post('/change-password', authenticateToken, validateRequest(changePasswordSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await changePassword(req, res);
        } catch (error) {
            next(error);
        }
    });

export default router;