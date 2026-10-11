import { apiRequest } from './apiClient';
import type { AccountRole, AuthResult } from '../types';

export type AuthInput = {
  role: AccountRole;
  username: string;
  password: string;
  email?: string;
  phone?: string;
};

export function login(input: AuthInput) {
  return apiRequest<AuthResult>('/api/auth/login', { method: 'POST', body: input });
}

export function register(input: AuthInput) {
  return apiRequest<AuthResult>('/api/auth/register', { method: 'POST', body: input });
}
