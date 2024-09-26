import jwt from 'jsonwebtoken';
import { User } from '../types/user';

export const useJwt = () => {
  const generateToken = (user: User): string => {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  };

  const verifyToken = (token: string): { userId: number } => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
  };

  return { generateToken, verifyToken };
};