import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BookSeatModal } from '../components/BookSeatModal';
import { BookingsSection } from '../components/BookingsSection';
import { DashboardHeader } from '../components/DashboardHeader';
import { RouteSearchSection } from '../components/RouteSearchSection';
import { TicketsSection } from '../components/TicketsSection';
import { WalletCard } from '../components/WalletCard';
import { ApiError } from '../services/apiClient';
import { cancelBooking, createBooking, getBookings, getBuses, getRoutes, getTickets, getWallet, payWithWallet } from '../services/passengerApi';
import { colors } from '../theme/colors';
import type { Booking, Bus, Route, Ticket, UserProfile, Wallet } from '../types';

type PassengerDashboardScreenProps = {
  token: string;
  profile: UserProfile;
  onSignOut: () => void;
};

export function PassengerDashboardScreen({ token, profile, onSignOut }: PassengerDashboardScreenProps) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [busyBookingID, setBusyBookingID] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<{ route: Route; bus: Bus } | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [nextRoutes, nextBuses, nextWallet, nextBookings, nextTickets] = await Promise.all([
        getRoutes(token),
        getBuses(token),
        getWallet(token),
        getBookings(token),
        getTickets(token),
      ]);
      setError('');
      setRoutes(nextRoutes);
      setBuses(nextBuses);
      setWallet(nextWallet);
      setBookings(nextBookings);
      setTickets(nextTickets);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        onSignOut();
        return;
      }
      setError(requestError instanceof Error ? requestError.message : 'Could not load your account data.');
    } finally {
      setLoading(false);
    }
  }, [onSignOut, token]);

  useEffect(() => {
    const task = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(task);
  }, [refresh]);

  const runAction = async (action: () => Promise<unknown>, closeModal = false) => {
    setError('');
    setBusy(true);
    try {
      await action();
      if (closeModal) setSelected(null);
      await refresh();
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        onSignOut();
        return;
      }
      setError(requestError instanceof Error ? requestError.message : 'The request could not be completed.');
    } finally {
      setBusy(false);
      setBusyBookingID(null);
    }
  };

  const pay = (bookingID: number) => {
    setBusyBookingID(bookingID);
    void runAction(() => payWithWallet(token, bookingID));
  };

  const cancel = (bookingID: number) => {
    setBusyBookingID(bookingID);
    void runAction(() => cancelBooking(token, bookingID));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <DashboardHeader profile={profile} onSignOut={() => void onSignOut()} />

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
            <Text style={styles.loadingText}>Loading your routes and account…</Text>
          </View>
        ) : (
          <>
            <WalletCard balance={wallet?.balance ?? null} />
            <RouteSearchSection
              buses={buses}
              onBook={(route, bus) => setSelected({ route, bus })}
              routes={routes}
            />
            <BookingsSection
              bookings={bookings}
              busyID={busyBookingID}
              onCancel={cancel}
              onPay={pay}
            />
            <TicketsSection tickets={tickets} />
          </>
        )}
      </ScrollView>

      <BookSeatModal
        bus={selected?.bus ?? null}
        busy={busy}
        onClose={() => setSelected(null)}
        onConfirm={(seatNumber) => {
          if (!selected) return;
          void runAction(
            () => createBooking(token, selected.bus.busID, selected.route.routeID, seatNumber),
            true,
          );
        }}
        route={selected?.route ?? null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: 34,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  errorBox: {
    backgroundColor: '#FFF1F0',
    borderColor: '#F2D4D1',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
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
    paddingVertical: 35,
  },
  loadingText: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 10,
  },
});
