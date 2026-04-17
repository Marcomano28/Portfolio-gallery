const normalizeBaseUrl = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/\/+$/, '');
};

const resolveApiBaseUrl = () => {
  const viteEnv = import.meta.env ?? {};
  const envBaseUrl = normalizeBaseUrl(viteEnv.VITE_API_URL);

  if (envBaseUrl) {
    return envBaseUrl;
  }

  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  if (isLocalhost) {
    return '/api';
  }

  console.error('VITE_API_URL is not configured for production.');
  return '';
};

export const apiBaseUrl = resolveApiBaseUrl();

export const getApiUrl = (path = '') => {
  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured. Set VITE_API_URL in Vercel.');
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};
