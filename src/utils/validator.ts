/**
 * Validates whether a string is a correctly-formed Roman numeral (1-100 range).
 * Rules enforced:
 *  - Only I, V, X, L, C allowed
 *  - No more than 3 consecutive identical symbols (only I, X, C may repeat)
 *  - V, L never repeat
 *  - Subtractive pairs: IV, IX, XL, XC only
 *  - Round-trip: toRoman(toArabic(s)) must equal s
 */
import { toRoman, toArabic } from "./converter";

const VALID_FULL = /^C?(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function isValidRoman(roman: string): boolean {
  if (!roman || roman.length === 0) return false;
  const upper = roman.toUpperCase();
  if (!VALID_FULL.test(upper)) return false;
  // Round-trip check
  const arabic = toArabic(upper);
  if (arabic < 1 || arabic > 100) return false;
  return toRoman(arabic) === upper;
}

export function validateAnswer(userAnswer: string, expected: string): boolean {
  return userAnswer.toUpperCase() === expected.toUpperCase();
}
