import { describe, it, expect } from 'vitest';
import { isValidRoman, validateAnswer } from '../utils/validator';

describe('isValidRoman', () => {
  it('accepts valid Roman numerals', () => {
    expect(isValidRoman('I')).toBe(true);
    expect(isValidRoman('IV')).toBe(true);
    expect(isValidRoman('IX')).toBe(true);
    expect(isValidRoman('XLIV')).toBe(true);
    expect(isValidRoman('XCIX')).toBe(true);
    expect(isValidRoman('C')).toBe(true);
    expect(isValidRoman('LXXVII')).toBe(true);
  });

  it('rejects more than 3 identical consecutive symbols', () => {
    expect(isValidRoman('IIII')).toBe(false);
    expect(isValidRoman('XXXX')).toBe(false);
  });

  it('rejects repeated V or L', () => {
    expect(isValidRoman('VV')).toBe(false);
    expect(isValidRoman('LL')).toBe(false);
  });

  it('rejects invalid subtractive pairs', () => {
    expect(isValidRoman('IL')).toBe(false);
    expect(isValidRoman('IC')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidRoman('')).toBe(false);
  });

  it('handles lowercase', () => {
    expect(isValidRoman('iv')).toBe(true);
    expect(isValidRoman('xcix')).toBe(true);
  });
});

describe('validateAnswer', () => {
  it('matches correct answers case-insensitively', () => {
    expect(validateAnswer('IV', 'iv')).toBe(true);
    expect(validateAnswer('XIV', 'XIV')).toBe(true);
  });

  it('rejects wrong answers', () => {
    expect(validateAnswer('IV', 'VI')).toBe(false);
  });
});
