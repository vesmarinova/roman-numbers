export interface RomanSymbol {
  symbol: string;
  value: number;
  order: number;
}

export const SYMBOLS: RomanSymbol[] = [
  { symbol: 'I', value: 1, order: 1 },
  { symbol: 'V', value: 5, order: 2 },
  { symbol: 'X', value: 10, order: 3 },
  { symbol: 'L', value: 50, order: 4 },
  { symbol: 'C', value: 100, order: 5 },
];

export interface GameLevel {
  id: number;
  name: { en: string; bg: string };
  range: { min: number; max: number };
  symbolsAllowed: string[];
  questionsCount: number;
}

export const LEVELS: GameLevel[] = [
  {
    id: 1,
    name: { en: 'Beginner', bg: 'Начинаещи' },
    range: { min: 1, max: 10 },
    symbolsAllowed: ['I', 'V', 'X'],
    questionsCount: 10,
  },
  {
    id: 2,
    name: { en: 'Intermediate', bg: 'Средно ниво' },
    range: { min: 1, max: 50 },
    symbolsAllowed: ['I', 'V', 'X', 'L'],
    questionsCount: 15,
  },
  {
    id: 3,
    name: { en: 'Advanced', bg: 'Напреднали' },
    range: { min: 1, max: 100 },
    symbolsAllowed: ['I', 'V', 'X', 'L', 'C'],
    questionsCount: 20,
  },
];

export interface ConversionPattern {
  pattern: string;
  value: number;
  explanation: { en: string; bg: string };
}

export const PATTERNS: ConversionPattern[] = [
  { pattern: 'IV', value: 4, explanation: { en: '5 − 1 = 4', bg: '5 − 1 = 4' } },
  { pattern: 'IX', value: 9, explanation: { en: '10 − 1 = 9', bg: '10 − 1 = 9' } },
  { pattern: 'XL', value: 40, explanation: { en: '50 − 10 = 40', bg: '50 − 10 = 40' } },
  { pattern: 'XC', value: 90, explanation: { en: '100 − 10 = 90', bg: '100 − 10 = 90' } },
];
