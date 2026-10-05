/**
 * Open an MCP server's sign-in page in a new tab.
 *
 * The link comes from the server's OAuth metadata, so anything other than an
 * http(s) URL is refused rather than handed to the browser.
 */
export const openMcpAuthorizationUrl = (url: string) => {
  let protocol: string;
  try {
    protocol = new URL(url).protocol;
  } catch {
    return;
  }
  if (protocol !== 'https:' && protocol !== 'http:') {
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};
