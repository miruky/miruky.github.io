/**
 * URL / data sanitization utilities.
 *
 * Provides safe-URL validation to prevent javascript: or data: scheme injection
 * from external API responses (e.g. Qiita API).
 */

/**
 * Validate that a URL uses a safe protocol (http or https).
 * Returns the original URL if safe, or '#' as a fallback.
 */
export function safeUrl(url: string | undefined | null): string {
  if (!url) return '#';
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return url;
    }
    return '#';
  } catch {
    // Relative URLs or malformed — reject to be safe
    return '#';
  }
}
