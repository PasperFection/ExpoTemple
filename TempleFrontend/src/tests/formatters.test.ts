import { formatCurrency } from '../utils/formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
      expect(formatCurrency(1000)).toBe('€ 1.000,00');
      expect(formatCurrency(1234.56)).toBe('€ 1.234,56');
      expect(formatCurrency(0.99)).toBe('€ 0,99');
      expect(formatCurrency(1000000)).toBe('€ 1.000.000,00');
    });

    it('formats negative numbers correctly', () => {
      expect(formatCurrency(-1000)).toBe('-€ 1.000,00');
      expect(formatCurrency(-0.5)).toBe('-€ 0,50');
    });

    it('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('€ 0,00');
    });

    it('handles extreme values', () => {
      expect(formatCurrency(Number.MAX_SAFE_INTEGER)).toMatch(/^€ \d{1,3}(\.\d{3})*,00$/);
      expect(formatCurrency(Number.MIN_SAFE_INTEGER)).toMatch(/^-€ \d{1,3}(\.\d{3})*,00$/);
    });
  });
});