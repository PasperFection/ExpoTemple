import { API_URL, JWT_SECRET } from '../utils/constants';

describe('Constants', () => {
  it('API_URL is defined', () => {
    expect(API_URL).toBeDefined();
    expect(typeof API_URL).toBe('string');
  });

  it('JWT_SECRET is defined', () => {
    expect(JWT_SECRET).toBeDefined();
    expect(typeof JWT_SECRET).toBe('string');
  });
});