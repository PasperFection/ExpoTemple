import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await UserService.registerUser(email, password);
  res.status(201).json({ message: 'User registered successfully', userId: user.id });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { token, userId } = await UserService.loginUser(email, password);
  res.json({ token, userId });
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  const newToken = await UserService.refreshToken(token);
  res.json({ token: newToken });
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  await UserService.resetPassword(email);
  res.json({ message: 'Password reset email sent' });
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body;
  await UserService.changePassword(token, newPassword);
  res.json({ message: 'Password changed successfully' });
};
