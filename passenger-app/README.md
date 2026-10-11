# MyBus Live Passenger

Standalone Expo app for passenger sign-in, route search, reservations, wallet payments, and tickets.

## Firebase Analytics

Firebase Analytics is enabled for web and native iOS/Android builds. Login and registration events record the authentication method; credentials and contact details are never sent to Analytics. App authentication and business data continue to use the Spring API.

The native Firebase SDK does not run in Expo Go, so Expo Go cannot launch the iOS/Android app with this integration. Register iOS and Android apps in Firebase using the configured identifier `com.mybuslive.passenger`, then download their respective `GoogleService-Info.plist` and `google-services.json` files into this project root. Do not use the web app config files for native builds.

After adding the native config files, build and install a development client:

```powershell
npx eas-cli build:configure
npx eas-cli build --profile development --platform android
npx eas-cli build --profile development --platform ios
```

The first command configures EAS for this app and may prompt you to sign in. EAS builds iOS in the cloud, so this also works from Windows. Rebuild the development client whenever native dependencies or Firebase config files change.

The web build uses the Firebase web app configuration in `src/services/analytics.web.ts`.

## Start the API

From `bus-system`, open PowerShell and provide a private JWT signing secret before starting Spring Boot:

```powershell
$env:MYBUS_JWT_SECRET = "replace-this-with-a-private-random-secret-at-least-32-bytes"
.\mvnw.cmd spring-boot:run
```

Do not commit or share the real secret. The API needs its configured database and route/bus records before the passenger app can find trips.

## Start the app

For web, from this folder run:

```powershell
npm run web
```

For native development builds, start Metro with `npx expo start --dev-client --tunnel`. The default API address is `http://10.0.2.2:8082` on an Android emulator and `http://localhost:8082` on a development machine. For a physical phone, point the app at your computer's LAN address before starting Expo:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://192.168.1.25:8082"
npx expo start --dev-client --tunnel
```

Replace the example address with your computer's reachable local IP. Keep the phone and computer on the same network.

## Features and API limits

- Passenger/driver role selection, login, and registration use `POST /api/auth/login` and `POST /api/auth/register`.
- Access tokens are stored with Expo SecureStore; protected API requests send a bearer token.
- Route and bus search uses live `GET /routes` and `GET /api/buses` data.
- Reservations use the authenticated passenger identity, selected bus, route, and seat.
- Wallet balance, bookings, wallet payment, and issued tickets use the protected API.
- Wallet top-ups are not enabled: no payment provider is configured. Wallet payments require an existing balance.
- Paid booking/ticket refunds are not enabled by the backend.
- A role can be selected in this app, but driver dashboards are in `driver-app`; sign in to a passenger account here to use passenger features.

## Project structure

- `App.tsx` restores the secure session and selects authentication or the passenger screen.
- `src/screens/` contains the authentication and passenger dashboard screens.
- `src/components/` contains the form, route, booking, wallet, and ticket UI.
- `src/services/` contains the API client and endpoint functions.
- `src/types.ts` contains API response types.
- `src/theme/` contains shared styles and colors.
