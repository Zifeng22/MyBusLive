import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Booking } from '../types';
import { colors } from '../theme/colors';

type BookingsSectionProps = {
  bookings: Booking[];
  busyID: number | null;
  onPay: (bookingID: number) => void;
  onCancel: (bookingID: number) => void;
};

export function BookingsSection({ bookings, busyID, onPay, onCancel }: BookingsSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>My bookings</Text>
        <Text style={styles.count}>{bookings.length}</Text>
      </View>
      {bookings.length === 0 ? (
        <Text style={styles.empty}>Your bus reservations will appear here.</Text>
      ) : (
        bookings.map((booking) => (
          <View key={booking.bookingID} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.route}>
                {booking.route?.origin ?? 'Route'} → {booking.route?.destination ?? 'destination'}
              </Text>
              <Text style={styles.status}>{booking.bookingStatus.replaceAll('_', ' ')}</Text>
            </View>
            <Text style={styles.meta}>
              {booking.bus?.busNumber ?? 'Bus'} · Seat {booking.seatNumber}
              {booking.route?.fare == null ? '' : ` · RM ${Number(booking.route.fare).toFixed(2)}`}
            </Text>
            {booking.bookingStatus === 'PENDING_PAYMENT' ? (
              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  disabled={busyID === booking.bookingID}
                  onPress={() => onPay(booking.bookingID)}
                  style={({ pressed }) => [styles.payButton, pressed && styles.pressed]}
                >
                  <Text style={styles.payText}>{busyID === booking.bookingID ? 'Working…' : 'Pay with wallet'}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  disabled={busyID === booking.bookingID}
                  onPress={() => onCancel(booking.bookingID)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '800',
  },
  count: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  empty: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    padding: 15,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 9,
    padding: 14,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  route: {
    color: colors.ink,
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
  },
  status: {
    color: colors.green,
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'right',
  },
  meta: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  payButton: {
    alignItems: 'center',
    backgroundColor: colors.greenLight,
    borderRadius: 9,
    flex: 1,
    justifyContent: 'center',
    minHeight: 38,
  },
  payText: {
    color: colors.green,
    fontSize: 10,
    fontWeight: '800',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cancelText: {
    color: colors.danger,
    fontSize: 10,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
