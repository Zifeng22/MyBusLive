import { StyleSheet, Text, View } from 'react-native';
import type { Bus } from '../types';
import { colors } from '../theme/colors';

export function BusAvailabilitySection({ buses }: { buses: Bus[] }) {
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.title}>Bus fleet</Text>
        <Text style={styles.count}>{buses.length} LISTED</Text>
      </View>
      {buses.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No buses are listed yet</Text>
          <Text style={styles.emptyDescription}>The fleet list will appear here when buses are added to the system.</Text>
        </View>
      ) : (
        buses.map((bus) => (
          <View key={bus.busID} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.busIcon}>
                <Text style={styles.busIconText}>BUS</Text>
              </View>
              <View style={styles.busCopy}>
                <Text style={styles.busNumber}>{bus.busNumber}</Text>
                <Text style={styles.meta}>
                  {bus.availableSeats} of {bus.totalSeats} seats · {bus.status || 'Status unavailable'}
                </Text>
              </View>
            </View>
            {bus.route ? (
              <Text style={styles.route}>
                {bus.route.origin} → {bus.route.destination}
              </Text>
            ) : (
              <Text style={styles.route}>No route assigned to this bus.</Text>
            )}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 24,
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '800',
  },
  count: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  empty: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 15,
    borderWidth: 1,
    padding: 16,
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  emptyDescription: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  busIcon: {
    alignItems: 'center',
    backgroundColor: colors.greenLight,
    borderRadius: 11,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  busIconText: {
    color: colors.green,
    fontSize: 8,
    fontWeight: '900',
  },
  busCopy: {
    flex: 1,
    marginLeft: 11,
  },
  busNumber: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  meta: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },
  route: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    color: colors.muted,
    fontSize: 11,
    marginTop: 12,
    paddingTop: 10,
  },
});
