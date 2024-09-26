import { validateEmail, validatePassword } from '../utils/validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid password', () => {
      expect(validatePassword('password123')).toBe(true);
    });

    it('should return false for short password', () => {
      expect(validatePassword('short')).toBe(false);
    });
  });
});