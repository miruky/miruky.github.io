import { describe, it, expect } from 'vitest';
import { parseWord, getDisplayRomaji, Chunk } from '@/lib/romaji';

describe('parseWord', () => {
  it('parses simple hiragana', () => {
    const chunks = parseWord('あいう');
    expect(chunks).toHaveLength(3);
    expect(chunks[0].kana).toBe('あ');
    expect(chunks[0].options).toContain('a');
    expect(chunks[1].kana).toBe('い');
    expect(chunks[1].options).toContain('i');
    expect(chunks[2].kana).toBe('う');
    expect(chunks[2].options).toContain('u');
  });

  it('parses combo kana (拗音)', () => {
    const chunks = parseWord('しゃ');
    expect(chunks).toHaveLength(1);
    expect(chunks[0].kana).toBe('しゃ');
    expect(chunks[0].options).toContain('sya');
    expect(chunks[0].options).toContain('sha');
  });

  it('handles っ (促音) before consonant', () => {
    const chunks = parseWord('っか');
    expect(chunks).toHaveLength(1);
    expect(chunks[0].kana).toBe('っか');
    expect(chunks[0].options).toContain('kka');
    expect(chunks[0].options.some(o => o.startsWith('xtu'))).toBe(true);
  });

  it('handles standalone っ', () => {
    const chunks = parseWord('っ');
    expect(chunks).toHaveLength(1);
    expect(chunks[0].kana).toBe('っ');
    expect(chunks[0].options).toContain('xtu');
  });

  it('handles ん before vowel (requires nn)', () => {
    const chunks = parseWord('んあ');
    expect(chunks).toHaveLength(2);
    expect(chunks[0].kana).toBe('ん');
    // Before vowel, 'n' alone should NOT be an option
    expect(chunks[0].options).not.toContain('n');
    expect(chunks[0].options).toContain('nn');
  });

  it('handles ん before consonant (n is OK)', () => {
    const chunks = parseWord('んか');
    expect(chunks).toHaveLength(2);
    expect(chunks[0].kana).toBe('ん');
    expect(chunks[0].options).toContain('n');
  });

  it('handles long words correctly', () => {
    const chunks = parseWord('ぷろぐらみんぐ');
    expect(chunks.length).toBeGreaterThanOrEqual(5);
    const romaji = getDisplayRomaji(chunks);
    expect(romaji).toContain('pu');
  });

  it('parses ちゃ with multiple options', () => {
    const chunks = parseWord('ちゃ');
    expect(chunks).toHaveLength(1);
    expect(chunks[0].options).toContain('tya');
    expect(chunks[0].options).toContain('cha');
    expect(chunks[0].options).toContain('cya');
  });
});

describe('getDisplayRomaji', () => {
  it('returns first option for each chunk', () => {
    const chunks: Chunk[] = [
      { kana: 'か', options: ['ka', 'ca'] },
      { kana: 'き', options: ['ki'] },
    ];
    expect(getDisplayRomaji(chunks)).toBe('kaki');
  });

  it('returns empty string for empty chunks', () => {
    expect(getDisplayRomaji([])).toBe('');
  });
});
