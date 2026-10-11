import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { Bus, Route } from '../types';
import { colors } from '../theme/colors';

type BookSeatModalProps = {
  route: Route | null;
  bus: Bus | null;
  busy: boolean;
  onClose: () => void;
  onConfirm: (seatNumber: number) => void;
};

export function BookSeatModal({ route, bus, busy, onClose, onConfirm }: BookSeatModalProps) {
  const [seat, setSeat] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const seatNumber = Number(seat);
    if (!Number.isInteger(seatNumber) || seatNumber < 1 || !bus || seatNumber > bus.totalSeats) {
      setError(`Enter a seat number from 1 to ${bus?.totalSeats ?? 0}.`);
      return;
    }
    setError('');
    onConfirm(seatNumber);
  };

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={route !== null && bus !== null}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Choose your seat</Text>
          <Text style={styles.subtitle}>
            {bus?.busNumber} · {route?.origin} to {route?.destination}
          </Text>
          <Text style={styles.label}>SEAT NUMBER</Text>
          <TextInput
            accessibilityLabel="Seat number"
            keyboardType="number-pad"
            maxLength={3}
            onChangeText={setSeat}
            placeholder={`1–${bus?.totalSeats ?? ''}`}
            placeholderTextColor="#9BA5B4"
            style={styles.input}
            value={seat}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={submit}
            style={({ pressed }) => [styles.primaryButton, (pressed || busy) && styles.pressed]}
          >
            <Text style={styles.primaryText}>{busy ? 'Reserving…' : `Reserve · RM ${Number(route?.fare ?? 0).toFixed(2)}`}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" disabled={busy} onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Not now</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(10, 20, 35, 0.42)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: 34,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#DDE3E8',
    borderRadius: 3,
    height: 5,
    marginBottom: 19,
    width: 42,
  },
  title: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  label: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 19,
  },
  input: {
    backgroundColor: '#F7F9FA',
    borderColor: colors.line,
    borderRadius: 11,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    marginTop: 7,
    minHeight: 48,
    paddingHorizontal: 13,
  },
  error: {
    color: colors.danger,
    fontSize: 11,
    marginTop: 7,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 17,
    minHeight: 48,
  },
  primaryText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 42,
  },
  cancelText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
