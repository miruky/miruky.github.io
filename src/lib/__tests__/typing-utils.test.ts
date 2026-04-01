import { describe, it, expect } from 'vitest';
import { getGrade, getGradeMascot, GRADE_COLORS, GRADE_MSG, STORAGE_KEY } from '@/lib/typing-utils';

describe('getGrade', () => {
  it('returns SS for very high KPM and accuracy', () => {
    expect(getGrade(400, 98)).toBe('SS');
    expect(getGrade(500, 100)).toBe('SS');
  });

  it('returns S for high KPM and accuracy', () => {
    expect(getGrade(350, 95)).toBe('S');
    expect(getGrade(399, 97)).toBe('S');
  });

  it('returns A', () => {
    expect(getGrade(250, 85)).toBe('A');
  });

  it('returns B', () => {
    expect(getGrade(150, 75)).toBe('B');
  });

  it('returns C', () => {
    expect(getGrade(80, 60)).toBe('C');
  });

  it('returns D for low scores', () => {
    expect(getGrade(50, 40)).toBe('D');
    expect(getGrade(0, 0)).toBe('D');
  });

  it('requires BOTH KPM and accuracy thresholds', () => {
    // High KPM but low accuracy → lower grade
    expect(getGrade(400, 50)).toBe('D');
    // Low KPM but high accuracy → lower grade
    expect(getGrade(50, 99)).toBe('D');
  });
});

describe('getGradeMascot', () => {
  it('returns happy for top grades', () => {
    expect(getGradeMascot('SS')).toBe('happy');
    expect(getGradeMascot('S')).toBe('happy');
    expect(getGradeMascot('A')).toBe('happy');
  });

  it('returns reading for B', () => {
    expect(getGradeMascot('B')).toBe('reading');
  });

  it('returns question for low grades', () => {
    expect(getGradeMascot('C')).toBe('question');
    expect(getGradeMascot('D')).toBe('question');
  });
});

describe('constants', () => {
  it('has GRADE_COLORS for all grades', () => {
    const grades = ['SS', 'S', 'A', 'B', 'C', 'D'];
    for (const g of grades) {
      expect(GRADE_COLORS[g]).toBeDefined();
      expect(GRADE_COLORS[g]).toContain('from-');
    }
  });

  it('has GRADE_MSG for all grades', () => {
    const grades = ['SS', 'S', 'A', 'B', 'C', 'D'];
    for (const g of grades) {
      expect(GRADE_MSG[g]).toBeDefined();
      expect(GRADE_MSG[g].length).toBeGreaterThan(0);
    }
  });

  it('STORAGE_KEY is a string', () => {
    expect(typeof STORAGE_KEY).toBe('string');
    expect(STORAGE_KEY.length).toBeGreaterThan(0);
  });
});
