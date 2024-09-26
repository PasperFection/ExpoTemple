import { API_URL, JWT_SECRET } from '../utils/constants';

describe('Constants', () => {
  it('API_URL is defined', () => {
    expect(API_URL).toBeDefined();
  });

  it('JWT_SECRET is defined', () => {
    expect(JWT_SECRET).toBeDefined();
  });
});