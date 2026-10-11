import { apiRequest } from './apiClient';
import type { Booking, Bus, PaymentResult, Route, Ticket, Wallet } from '../types';

export const getRoutes = (token: string) => apiRequest<Route[]>('/routes', { token });
export const getBuses = (token: string) => apiRequest<Bus[]>('/api/buses', { token });
export const getWallet = (token: string) => apiRequest<Wallet | null>('/api/wallets/me', { token });
export const getBookings = (token: string) => apiRequest<Booking[]>('/api/bookings/me', { token });
export const getTickets = (token: string) => apiRequest<Ticket[]>('/api/tickets/me', { token });

export const createBooking = (token: string, busID: number, routeID: number, seatNumber: number) =>
  apiRequest<Booking>('/api/bookings', {
    token,
    method: 'POST',
    body: { busID, routeID, seatNumber },
  });

export const cancelBooking = (token: string, bookingID: number) =>
  apiRequest<Booking>(`/api/bookings/${bookingID}/cancel`, { token, method: 'PUT' });

export const payWithWallet = (token: string, bookingID: number) =>
  apiRequest<PaymentResult>(`/api/payments/wallet/booking/${bookingID}`, { token, method: 'POST' });
