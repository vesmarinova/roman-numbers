const CONVERSIONS = [
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' },
] as const;

export function toRoman(num: number): string {
  if (num < 1 || num > 100 || !Number.isInteger(num)) return '';
  let result = '';
  let remaining = num;
  for (const { value, numeral } of CONVERSIONS) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

export function toArabic(roman: string): number {
  const values: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100,
  };
  let result = 0;
  const upper = roman.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const current = values[upper[i]];
    const next = values[upper[i + 1]];
    if (current === undefined) return -1;
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

/** Break a Roman numeral into its component parts for visual display */
export function breakdownRoman(roman: string): { part: string; value: number }[] {
  const parts: { part: string; value: number }[] = [];
  const upper = roman.toUpperCase();
  const values: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100,
  };
  let i = 0;
  while (i < upper.length) {
    const current = values[upper[i]];
    const next = values[upper[i + 1]];
    if (next && current < next) {
      parts.push({ part: upper[i] + upper[i + 1], value: next - current });
      i += 2;
    } else {
      parts.push({ part: upper[i], value: current });
      i += 1;
    }
  }
  return parts;
}
