import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import logger from '../utils/logger';

export class UserService {
  static resetPassword(email: any) {
      throw new Error('Method not implemented.');
  }
  static changePassword(token: any, newPassword: any) {
      throw new Error('Method not implemented.');
  }
  static async registerUser(email: string, password: string): Promise<User> {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const newUser = await User.create({ email, password });
      logger.info(`New user registered: ${email}`);
      return newUser;
    } catch (error) {
      logger.error('Error registering user:', error);
      throw error;
    }
  }

  static async loginUser(email: string, password: string): Promise<{ token: string, userId: number }> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      logger.info(`User logged in: ${email}`);
      return { token, userId: user.id };
    } catch (error) {
      logger.error('Error logging in user:', error);
      throw error;
    }
  }

  static async logoutUser(userId: number): Promise<void> {
    try {
      // Hier kun je eventueel logica toevoegen om de token ongeldig te maken

      // of om de gebruiker uit te loggen in je systeem
      logger.info(`User logged out: ${userId}`);
    } catch (error) {
      logger.error('Error logging out user:', error);
      throw error;
    }
  }

  static async refreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      logger.info(`Token refreshed for user: ${user.email}`);
      return newToken;
    } catch (error) {
      logger.error('Error refreshing token:', error);
      throw error;
    }
  }
}