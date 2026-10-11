export type AccountRole = 'PASSENGER' | 'DRIVER';

export type AuthResult = UserProfile & {
  token: string;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: AccountRole;
};

export type Route = {
  routeID: number;
  origin: string;
  destination: string;
  fare: number;
  estimatedTime: number;
};

export type Bus = {
  busID: number;
  busNumber: string;
  totalSeats: number;
  availableSeats: number;
  status: string;
  route: Route | null;
};

export type Booking = {
  bookingID: number;
  seatNumber: number;
  bookingTime: string;
  bookingStatus: string;
  route: Route | null;
  bus: Bus | null;
};

export type Wallet = {
  walletID: number;
  balance: number;
};

export type Ticket = {
  ticketID: number;
  qrCode: string;
  issueDate: string;
  ticketStatus: string;
  booking: Booking;
};

export type PaymentResult = {
  paymentID: number;
  bookingID: number;
  amount: number;
  paymentStatus: string;
  ticketID: number;
};
