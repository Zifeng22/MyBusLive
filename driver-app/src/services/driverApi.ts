import { apiRequest } from './apiClient';
import type { Bus, Route } from '../types';

export const getBuses = (token: string) => apiRequest<Bus[]>('/api/buses', { token });
export const getRoutes = (token: string) => apiRequest<Route[]>('/routes', { token });
