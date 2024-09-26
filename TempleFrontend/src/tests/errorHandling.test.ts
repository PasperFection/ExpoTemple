import { AppError, handleError } from '../utils/errorHandling';

describe('Error Handling', () => {
  it('should create an AppError', () => {
    const error = new AppError('TEST_ERROR', 'Test error message');
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe('TEST_ERROR');
    expect(error.message).toBe('Test error message');
  });

  it('should handle AppError', () => {
    const originalError = new AppError('TEST_ERROR', 'Test error message');
    const handledError = handleError(originalError);
    expect(handledError).toBe(originalError);
  });

  it('should handle standard Error', () => {
    const originalError = new Error('Standard error message');
    const handledError = handleError(originalError);
    expect(handledError).toBeInstanceOf(AppError);
    expect(handledError.code).toBe('UNKNOWN_ERROR');
    expect(handledError.message).toBe('Standard error message');
  });

  it('should handle unknown error types', () => {
    const handledError = handleError('Not an error object');
    expect(handledError).toBeInstanceOf(AppError);
    expect(handledError.code).toBe('UNKNOWN_ERROR');
    expect(handledError.message).toBe('An unknown error occurred');
  });
});