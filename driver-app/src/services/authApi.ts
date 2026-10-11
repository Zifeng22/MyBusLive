import { apiRequest } from './apiClient';
import type { AccountRole, AuthResult } from '../types';

type AuthInput = {
  role: AccountRole;
  username: string;
  password: string;
  email?: string;
  phone?: string;
};

export const login = (input: AuthInput) =>
  apiRequest<AuthResult>('/api/auth/login', { method: 'POST', body: input });

export const register = (input: AuthInput) =>
  apiRequest<AuthResult>('/api/auth/register', { method: 'POST', body: input });
