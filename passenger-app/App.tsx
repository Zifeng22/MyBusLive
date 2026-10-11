import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthScreen } from './src/screens/AuthScreen';
import { PassengerDashboardScreen } from './src/screens/PassengerDashboardScreen';
import { initializeAnalytics } from './src/services/analytics';
import { apiRequest, ApiError } from './src/services/apiClient';
import { colors } from './src/theme/colors';
import type { AuthResult, UserProfile } from './src/types';

const TOKEN_KEY = 'mybus-passenger-token';
const APP_ROLE = 'PASSENGER';

export default function App() {
  const [session, setSession] = useState<{ token: string; profile: UserProfile } | null>(null);
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
        const profile = await apiRequest<UserProfile>('/api/auth/me', { token });
        if (profile.role !== APP_ROLE) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
          return;
        }
        setSession({ token, profile });
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
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
      throw new Error('This account belongs in the driver-app project. Open that app to continue.');
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
        <Text style={styles.loadingText}>Restoring your session…</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return <AuthScreen appRole={APP_ROLE} initialError={restoreError} onAuthenticated={handleAuthenticated} />;
  }

  return <PassengerDashboardScreen token={session.token} profile={session.profile} onSignOut={signOut} />;
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 12,
  },
});
