import { shuffle } from './shuffle';

/**
 * Generate 3 plausible wrong answers for a given correct Arabic number.
 * Strategies:
 *  - Near misses (±1 to ±5)
 *  - Common confusions (swap additive/subtractive: 4↔6, 9↔11, 40↔60, 90↔110)
 */
export function generateDistractors(
  correct: number,
  min: number,
  max: number,
  count = 3
): number[] {
  const candidates = new Set<number>();

  // Common confusions
  const confusions: Record<number, number[]> = {
    4: [6], 6: [4], 9: [11], 11: [9],
    14: [16], 19: [21], 40: [60], 60: [40],
    49: [51], 90: [110 > max ? 80 : 110], 99: [101 > max ? 91 : 100],
  };
  if (confusions[correct]) {
    for (const c of confusions[correct]) {
      if (c >= min && c <= max && c !== correct) candidates.add(c);
    }
  }

  // Near misses
  for (const offset of [1, -1, 2, -2, 3, -3, 5, -5, 10, -10]) {
    const val = correct + offset;
    if (val >= min && val <= max && val !== correct) {
      candidates.add(val);
    }
    if (candidates.size >= count * 2) break;
  }

  // Ensure we have enough
  let attempt = 1;
  while (candidates.size < count) {
    const val = correct + (attempt % 2 === 0 ? attempt : -attempt);
    attempt++;
    if (val >= min && val <= max && val !== correct) {
      candidates.add(val);
    }
    if (attempt > 50) break;
  }

  return shuffle([...candidates]).slice(0, count);
}
