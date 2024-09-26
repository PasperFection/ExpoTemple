import bcrypt from 'bcryptjs';

export const usePasswordHash = () => {
  const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 12);
  };

  const comparePassword = async (candidatePassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, hashedPassword);
  };

  return { hashPassword, comparePassword };
};