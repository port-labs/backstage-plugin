export const PORT_API_BASE_URL = 'v1';

export function getBaseUrl(domain: string): string {
  const baseUrl = domain.endsWith('/') ? domain : `${domain}/`;

  return `${baseUrl}${PORT_API_BASE_URL}`;
}

export function buildPortUrl(domain: string, subpath: string) {
  const baseUrl = getBaseUrl(domain);
  return `${baseUrl}${subpath}`;
}
