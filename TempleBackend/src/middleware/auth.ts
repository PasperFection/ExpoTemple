import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import logger from '../utils/logger';

// Uitleg: Deze functie controleert of de gebruiker een geldig token heeft en voegt de gebruiker toe aan het request object
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Haal de autorisatieheader op
    const authHeader = req.headers['authorization'];
    // Haal het token uit de autorisatieheader
    const token = authHeader && authHeader.split(' ')[1];

    // Controleer of er een token is
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    // Verifieer het token en decodeer het
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    // Zoek de gebruiker op basis van de userId uit het token
    const user = await User.findByPk(decoded.userId);

    // Controleer of de gebruiker bestaat
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Voeg de gebruiker toe aan het request object
    (req as any).user = user;
    next();
  } catch (error) {
    // Log de fout
    logger.error('Error authenticating token:', error);
    // Controleer of de fout een JsonWebTokenError is
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: 'Invalid token' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};