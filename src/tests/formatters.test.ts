import { formatCurrency } from '../utils/formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('€ 1.000,00');
      expect(formatCurrency(1234.56)).toBe('€ 1.234,56');
    });
  });
});