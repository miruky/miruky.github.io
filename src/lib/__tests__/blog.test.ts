import { describe, it, expect } from 'vitest';
import { extractHeadings, injectHeadingIds } from '@/lib/blog';

describe('extractHeadings', () => {
  it('extracts h2 and h3 headings', () => {
    const html = '<h2>Title</h2><p>body</p><h3>Subtitle</h3>';
    const headings = extractHeadings(html);
    expect(headings).toHaveLength(2);
    expect(headings[0]).toEqual({ id: 'title', text: 'Title', level: 2 });
    expect(headings[1]).toEqual({ id: 'subtitle', text: 'Subtitle', level: 3 });
  });

  it('ignores h1, h4, h5, h6', () => {
    const html = '<h1>H1</h1><h4>H4</h4><h5>H5</h5><h6>H6</h6>';
    expect(extractHeadings(html)).toHaveLength(0);
  });

  it('handles Japanese text', () => {
    const html = '<h2>概要</h2><h3>詳細説明</h3>';
    const headings = extractHeadings(html);
    expect(headings).toHaveLength(2);
    expect(headings[0].text).toBe('概要');
    expect(headings[0].id).toBe('概要');
    expect(headings[1].text).toBe('詳細説明');
  });

  it('strips nested HTML tags from heading text', () => {
    const html = '<h2>Title with <code>code</code></h2>';
    const headings = extractHeadings(html);
    expect(headings[0].text).toBe('Title with code');
  });

  it('returns empty array for no headings', () => {
    expect(extractHeadings('<p>no headings here</p>')).toEqual([]);
  });
});

describe('injectHeadingIds', () => {
  it('adds id attribute to h2 and h3', () => {
    const html = '<h2>Hello World</h2>';
    const result = injectHeadingIds(html);
    expect(result).toBe('<h2 id="hello-world">Hello World</h2>');
  });

  it('preserves other tags', () => {
    const html = '<p>text</p><h2>Title</h2><p>more</p>';
    const result = injectHeadingIds(html);
    expect(result).toContain('<p>text</p>');
    expect(result).toContain('<h2 id="title">Title</h2>');
    expect(result).toContain('<p>more</p>');
  });

  it('handles Japanese heading IDs', () => {
    const html = '<h2>概要</h2>';
    const result = injectHeadingIds(html);
    expect(result).toBe('<h2 id="概要">概要</h2>');
  });
});
