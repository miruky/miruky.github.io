import { describe, it, expect } from 'vitest';
import { safeUrl } from '@/lib/sanitize';

describe('safeUrl', () => {
  it('allows https URLs', () => {
    expect(safeUrl('https://example.com')).toBe('https://example.com');
  });

  it('allows http URLs', () => {
    expect(safeUrl('http://example.com')).toBe('http://example.com');
  });

  it('blocks javascript: URLs', () => {
    expect(safeUrl('javascript:alert(1)')).toBe('#');
  });

  it('blocks data: URLs', () => {
    expect(safeUrl('data:text/html,<h1>hi</h1>')).toBe('#');
  });

  it('returns # for null/undefined', () => {
    expect(safeUrl(null)).toBe('#');
    expect(safeUrl(undefined)).toBe('#');
    expect(safeUrl('')).toBe('#');
  });

  it('blocks ftp: URLs', () => {
    expect(safeUrl('ftp://example.com')).toBe('#');
  });

  it('handles URLs with paths and queries', () => {
    expect(safeUrl('https://example.com/path?q=1&a=2')).toBe('https://example.com/path?q=1&a=2');
  });
});
