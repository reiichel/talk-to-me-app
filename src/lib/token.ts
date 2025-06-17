import Cookies from 'js-cookie';
import {
  AUTH_TOKEN_COOKIE_NAME,
  AUTH_TOKEN_COOKIE_EXPIRATION_DAYS,
} from '@/config/constants';

export const saveToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_COOKIE_NAME, token, { expires: AUTH_TOKEN_COOKIE_EXPIRATION_DAYS });
};

export const getToken = () => Cookies.get(AUTH_TOKEN_COOKIE_NAME);

export const removeToken = () => {
  Cookies.remove(AUTH_TOKEN_COOKIE_NAME);
};
