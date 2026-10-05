import { afterEach, describe, expect, it, vi } from 'vitest';

import { openMcpAuthorizationUrl } from './mcp';

describe('openMcpAuthorizationUrl', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('opens an https sign-in page in a new tab without an opener', () => {
    const open = vi.fn();
    vi.stubGlobal('window', { open });

    openMcpAuthorizationUrl('https://auth.example.com/authorize?state=abc');

    expect(open).toHaveBeenCalledWith(
      'https://auth.example.com/authorize?state=abc',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it.each(['javascript:alert(1)', 'data:text/html,hi', 'not a url'])(
    'refuses %s',
    (url) => {
      const open = vi.fn();
      vi.stubGlobal('window', { open });

      openMcpAuthorizationUrl(url);

      expect(open).not.toHaveBeenCalled();
    }
  );
});
