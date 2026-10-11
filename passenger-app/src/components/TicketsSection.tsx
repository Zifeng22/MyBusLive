import { StyleSheet, Text, View } from 'react-native';
import type { Ticket } from '../types';
import { colors } from '../theme/colors';

export function TicketsSection({ tickets }: { tickets: Ticket[] }) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>My tickets</Text>
        <Text style={styles.count}>{tickets.length}</Text>
      </View>
      {tickets.length === 0 ? (
        <Text style={styles.empty}>Tickets are issued after a booking is paid from your wallet.</Text>
      ) : (
        tickets.map((ticket) => (
          <View key={ticket.ticketID} style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.ticketTitle}>Ticket #{ticket.ticketID}</Text>
              <Text style={styles.status}>{ticket.ticketStatus}</Text>
            </View>
            <Text style={styles.route}>
              {ticket.booking?.route?.origin ?? 'Route'} → {ticket.booking?.route?.destination ?? 'destination'}
            </Text>
            <Text style={styles.codeLabel}>TICKET CODE</Text>
            <Text selectable style={styles.code}>{ticket.qrCode}</Text>
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
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  status: {
    color: colors.green,
    fontSize: 9,
    fontWeight: '800',
  },
  route: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 6,
  },
  codeLabel: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 12,
  },
  code: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});
