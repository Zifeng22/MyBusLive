import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthScreen } from './src/screens/AuthScreen';
import { DriverDashboardScreen } from './src/screens/DriverDashboardScreen';
import { initializeAnalytics } from './src/services/analytics';
import { apiRequest } from './src/services/apiClient';
import { colors } from './src/theme/colors';
import type { AuthResult, DriverProfile } from './src/types';

const TOKEN_KEY = 'mybus-driver-token';
const APP_ROLE = 'DRIVER';

export default function App() {
  const [session, setSession] = useState<{ token: string; profile: DriverProfile } | null>(null);
  const [loading, setLoading] = useState(true);
  const [restoreError, setRestoreError] = useState('');

  useEffect(() => {
    void initializeAnalytics().catch((error: unknown) => {
      console.warn('Firebase Analytics initialization failed.', error);
    });
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (!token) return;
        const profile = await apiRequest<DriverProfile>('/api/auth/me', { token });
        if (profile.role !== APP_ROLE) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
        } else {
          setSession({ token, profile });
        }
      } catch (error) {
        if (error instanceof Error && 'status' in error && error.status === 401) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
        } else {
          setRestoreError(error instanceof Error ? error.message : 'Could not restore your sign-in.');
        }
      } finally {
        setLoading(false);
      }
    };
    void restoreSession();
  }, []);

  const handleAuthenticated = async (result: AuthResult) => {
    if (result.role !== APP_ROLE) {
      throw new Error('This account belongs in the passenger-app project. Open that app to continue.');
    }
    await SecureStore.setItemAsync(TOKEN_KEY, result.token);
    setRestoreError('');
    setSession({ token: result.token, profile: result });
  };

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setSession(null);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator color={colors.green} size="large" />
        <Text style={styles.message}>Restoring your session…</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return <AuthScreen appRole={APP_ROLE} initialError={restoreError} onAuthenticated={handleAuthenticated} />;
  }

  return <DriverDashboardScreen token={session.token} profile={session.profile} onSignOut={signOut} />;
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 12,
  },
});
