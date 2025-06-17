import { LOGIN_URL } from '@/config/endpoints';
import { saveToken } from '@/lib/token';
import type { LoginRequest, LoginResponse } from '@/models/auth';
import type { ApiErrorResponse } from '@/models/api';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  let json: LoginResponse | ApiErrorResponse;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error('Invalid server response');
  }

  if (!res.ok) {
    const errorData = json as ApiErrorResponse;
    throw new Error(errorData.message || 'Login failed');
  }

  const result = json as LoginResponse;

  saveToken(result.token);
  return result;
}
