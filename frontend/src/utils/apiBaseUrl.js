const DEFAULT_PRODUCTION_API_URL = 'https://portfolio-backend-eu-3d0be158a30f.herokuapp.com/api';

const normalizeBaseUrl = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/\/+$/, '');
};

const resolveApiBaseUrl = () => {
  const envBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_URL);

  if (envBaseUrl) {
    return envBaseUrl;
  }

  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  return isLocalhost ? '/api' : DEFAULT_PRODUCTION_API_URL;
};

export const apiBaseUrl = resolveApiBaseUrl();
