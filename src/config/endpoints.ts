const BASE_URL = import.meta.env.VITE_API_BASE_URL!;

export const LOGIN_URL = `${BASE_URL}auth/login`;
export const LOGOUT_URL = `${BASE_URL}auth/logout`;

export const CUSTOMERS_URL = `${BASE_URL}api/Customer`;