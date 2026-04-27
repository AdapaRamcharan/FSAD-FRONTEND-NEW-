import axios from 'axios';

const normalizeBaseUrl = (value) => (value || '').trim().replace(/\/+$/, '');

const resolveApiBaseUrl = () => {
  const envBaseUrl = normalizeBaseUrl(process.env.REACT_APP_API_BASE_URL);
  if (envBaseUrl) {
    return envBaseUrl;
  }

  // Never default to localhost in production builds.
  if (process.env.NODE_ENV === 'production') {
    return '';
  }

  return 'http://localhost:8080';
};

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const unwrapData = (payload) => {
  if (payload == null) return payload;
  if (Array.isArray(payload)) return payload;

  return payload.data || payload.payload || payload.result || payload.response || payload;
};

export const asArray = (payload, keys = []) => {
  const unwrapped = unwrapData(payload);
  if (Array.isArray(unwrapped)) return unwrapped;

  for (const key of ['content', 'items', 'list', ...keys]) {
    if (Array.isArray(unwrapped?.[key])) {
      return unwrapped[key];
    }
  }

  return [];
};

export const extractToken = (payload) => {
  const unwrapped = unwrapData(payload) || {};
  return (
    unwrapped.token ||
    unwrapped.jwt ||
    unwrapped.accessToken ||
    unwrapped.authToken ||
    unwrapped?.authenticationResponse?.token ||
    null
  );
};

export const extractUserPayload = (payload) => {
  const unwrapped = unwrapData(payload) || {};
  return unwrapped.user || unwrapped.account || unwrapped.profile || unwrapped;
};

export const getWithFallback = async (paths) => {
  let lastError = null;
  for (const path of paths) {
    try {
      const res = await api.get(path);
      return res;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('All API endpoints failed');
};

export const postWithFallback = async (paths, body, config = {}) => {
  let lastError = null;
  for (const path of paths) {
    try {
      const res = await api.post(path, body, config);
      return res;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('All API endpoints failed');
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error?.response?.data?.error || error.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

export default api;
