# MyBus Live Driver

Standalone Expo app for driver registration, sign-in, and live fleet viewing.

## Firebase Analytics

Firebase Analytics is enabled for web and native iOS/Android builds. Login and registration events record the authentication method; credentials and contact details are never sent to Analytics. App authentication and business data continue to use the Spring API.

The native Firebase SDK does not run in Expo Go, so Expo Go cannot launch the iOS/Android app with this integration. Register iOS and Android apps in Firebase using the configured identifier `com.mybuslive.driver`, then download their respective `GoogleService-Info.plist` and `google-services.json` files into this project root. Do not use the web app config files for native builds.

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

Do not commit or share the real secret.

## Start the app

For web, from this folder run:

```powershell
npm run web
```

For native development builds, start Metro with `npx expo start --dev-client`. The default API address is `http://10.0.2.2:8082` on an Android emulator and `http://localhost:8082` on a development machine. For a physical phone, point the app at your computer's LAN address before starting Expo:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://192.168.1.25:8082"
npx expo start --dev-client --tunnel
```

Replace the example address with your computer's reachable local IP. Keep the phone and computer on the same network.

## Features and API limits

- Passenger/driver role selection, login, and registration use the authenticated backend.
- Driver access tokens are stored with Expo SecureStore.
- Bus and route information is loaded from the live Spring API.
- Driver-to-bus assignments, shift tracking, trip statistics, and issue reporting are not implemented by the backend; the app marks these limitations instead of showing sample driver data.
- Driver dashboards are in this project. Passenger dashboards are in `passenger-app`.

## Project structure

- `App.tsx` restores the secure session and selects authentication or the driver screen.
- `src/screens/` contains the authentication and driver dashboard screens.
- `src/components/` contains the authentication and live fleet UI.
- `src/services/` contains the API client and endpoint functions.
- `src/types.ts` contains API response types.
- `src/theme/` contains shared colors.
