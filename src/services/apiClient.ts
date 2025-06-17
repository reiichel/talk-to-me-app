import { getToken } from '@/lib/token';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
