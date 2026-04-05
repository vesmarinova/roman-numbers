import { describe, it, expect } from 'vitest';
import { toRoman, toArabic, breakdownRoman } from '../utils/converter';

describe('toRoman', () => {
  const cases: [number, string][] = [
    [1, 'I'], [2, 'II'], [3, 'III'], [4, 'IV'], [5, 'V'],
    [6, 'VI'], [7, 'VII'], [8, 'VIII'], [9, 'IX'], [10, 'X'],
    [14, 'XIV'], [19, 'XIX'], [20, 'XX'], [29, 'XXIX'],
    [40, 'XL'], [44, 'XLIV'], [49, 'XLIX'], [50, 'L'],
    [51, 'LI'], [60, 'LX'], [77, 'LXXVII'], [89, 'LXXXIX'],
    [90, 'XC'], [99, 'XCIX'], [100, 'C'],
  ];

  it.each(cases)('converts %i to %s', (num, expected) => {
    expect(toRoman(num)).toBe(expected);
  });

  it('returns empty string for out-of-range numbers', () => {
    expect(toRoman(0)).toBe('');
    expect(toRoman(-1)).toBe('');
    expect(toRoman(101)).toBe('');
    expect(toRoman(1.5)).toBe('');
  });
});

describe('toArabic', () => {
  const cases: [string, number][] = [
    ['I', 1], ['IV', 4], ['IX', 9], ['X', 10],
    ['XL', 40], ['XLIX', 49], ['L', 50], ['XC', 90],
    ['XCIX', 99], ['C', 100], ['LXXVII', 77],
  ];

  it.each(cases)('converts %s to %i', (roman, expected) => {
    expect(toArabic(roman)).toBe(expected);
  });

  it('handles lowercase input', () => {
    expect(toArabic('iv')).toBe(4);
    expect(toArabic('xcix')).toBe(99);
  });

  it('returns -1 for invalid characters', () => {
    expect(toArabic('Z')).toBe(-1);
  });
});

describe('breakdownRoman', () => {
  it('breaks down XLVII', () => {
    expect(breakdownRoman('XLVII')).toEqual([
      { part: 'XL', value: 40 },
      { part: 'V', value: 5 },
      { part: 'I', value: 1 },
      { part: 'I', value: 1 },
    ]);
  });

  it('breaks down IV', () => {
    expect(breakdownRoman('IV')).toEqual([{ part: 'IV', value: 4 }]);
  });

  it('breaks down XCIX', () => {
    expect(breakdownRoman('XCIX')).toEqual([
      { part: 'XC', value: 90 },
      { part: 'IX', value: 9 },
    ]);
  });
});
