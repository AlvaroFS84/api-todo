import { describe, it, expect } from 'vitest';
import { SumUseCase } from '../../../src/application/useCases/SumUseCase';

describe('SumUseCase', () => {
  const useCase = new SumUseCase();

  it('should return the sum of two positive numbers', () => {
    const result = useCase.execute({ a: 3, b: 5 });
    expect(result).toEqual({ a: 3, b: 5, result: 8 });
  });

  it('should handle negative numbers', () => {
    const result = useCase.execute({ a: -4, b: 10 });
    expect(result).toEqual({ a: -4, b: 10, result: 6 });
  });

  it('should handle decimal numbers', () => {
    const result = useCase.execute({ a: 1.5, b: 2.5 });
    expect(result).toEqual({ a: 1.5, b: 2.5, result: 4 });
  });

  it('should handle zero', () => {
    const result = useCase.execute({ a: 0, b: 0 });
    expect(result).toEqual({ a: 0, b: 0, result: 0 });
  });

  it('should throw an error when a is NaN', () => {
    expect(() => useCase.execute({ a: NaN, b: 5 })).toThrow(
      'Both "a" and "b" must be valid numbers'
    );
  });

  it('should throw an error when b is NaN', () => {
    expect(() => useCase.execute({ a: 3, b: NaN })).toThrow(
      'Both "a" and "b" must be valid numbers'
    );
  });
});
