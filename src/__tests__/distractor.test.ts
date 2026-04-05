import { describe, it, expect } from 'vitest';
import { generateDistractors } from '../utils/distractor';

describe('generateDistractors', () => {
  it('generates exactly 3 distractors', () => {
    const d = generateDistractors(50, 1, 100);
    expect(d).toHaveLength(3);
  });

  it('does not include the correct answer', () => {
    for (let i = 0; i < 20; i++) {
      const d = generateDistractors(42, 1, 100);
      expect(d).not.toContain(42);
    }
  });

  it('stays within range', () => {
    const d = generateDistractors(5, 1, 10);
    for (const val of d) {
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
    }
  });

  it('has no duplicates', () => {
    for (let i = 0; i < 20; i++) {
      const d = generateDistractors(25, 1, 50);
      expect(new Set(d).size).toBe(d.length);
    }
  });

  it('works at range boundaries', () => {
    const d1 = generateDistractors(1, 1, 10);
    expect(d1.length).toBe(3);
    expect(d1.every((v) => v >= 1 && v <= 10)).toBe(true);

    const d2 = generateDistractors(100, 51, 100);
    expect(d2.length).toBe(3);
    expect(d2.every((v) => v >= 51 && v <= 100)).toBe(true);
  });
});
