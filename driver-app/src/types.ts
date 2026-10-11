export type AccountRole = 'PASSENGER' | 'DRIVER';

export type AuthResult = DriverProfile & {
  token: string;
};

export type DriverProfile = {
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
