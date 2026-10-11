import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BusAvailabilitySection } from '../components/BusAvailabilitySection';
import { ApiError } from '../services/apiClient';
import { getBuses, getRoutes } from '../services/driverApi';
import type { Bus, DriverProfile, Route } from '../types';
import { colors } from '../theme/colors';

type DriverDashboardScreenProps = {
  token: string;
  profile: DriverProfile;
  onSignOut: () => void;
};

export function DriverDashboardScreen({ token, profile, onSignOut }: DriverDashboardScreenProps) {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    try {
      const [nextBuses, nextRoutes] = await Promise.all([getBuses(token), getRoutes(token)]);
      setError('');
      setBuses(nextBuses);
      setRoutes(nextRoutes);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        onSignOut();
        return;
      }
      setError(requestError instanceof Error ? requestError.message : 'Could not load fleet information.');
    } finally {
      setLoading(false);
    }
  }, [onSignOut, token]);

  useEffect(() => {
    const task = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(task);
  }, [refresh]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>MYBUS LIVE · DRIVER</Text>
            <Text style={styles.greeting}>Hello, {profile.username}</Text>
            <Text style={styles.date}>Your account is connected to the bus system.</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => void onSignOut()} style={styles.signOut}>
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Driver schedules aren’t available yet</Text>
          <Text style={styles.noticeText}>
            The API has no driver-to-bus assignments or shift tracking. This fleet list is live, but it is not a personal assignment.
          </Text>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text accessibilityRole="alert" style={styles.errorText}>{error}</Text>
            <Pressable accessibilityRole="button" onPress={() => void refresh()}>
              <Text style={styles.retry}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.green} />
            <Text style={styles.loadingText}>Loading live fleet information…</Text>
          </View>
        ) : (
          <>
            <BusAvailabilitySection buses={buses} />
            <View style={styles.routeSummary}>
              <Text style={styles.routeCount}>{routes.length}</Text>
              <View style={styles.routeCopy}>
                <Text style={styles.routeTitle}>Routes in system</Text>
                <Text style={styles.routeCaption}>Available to view · assignments not yet exposed</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: 32,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: colors.green,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  greeting: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 6,
  },
  date: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },
  signOut: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 9,
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  signOutText: {
    color: colors.green,
    fontSize: 10,
    fontWeight: '800',
  },
  notice: {
    backgroundColor: '#FFF8E8',
    borderColor: '#F3E5C2',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  noticeTitle: {
    color: '#69511D',
    fontSize: 12,
    fontWeight: '800',
  },
  noticeText: {
    color: '#695B3C',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  errorBox: {
    backgroundColor: '#FFF1F0',
    borderColor: '#F2D4D1',
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 14,
    padding: 12,
  },
  errorText: {
    color: colors.danger,
    fontSize: 11,
    lineHeight: 16,
  },
  retry: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 7,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 34,
  },
  loadingText: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 9,
  },
  routeSummary: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 5,
    padding: 14,
  },
  routeCount: {
    color: colors.green,
    fontSize: 22,
    fontWeight: '900',
  },
  routeCopy: {
    marginLeft: 12,
  },
  routeTitle: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  routeCaption: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },
});
