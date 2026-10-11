import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { UserProfile } from '../types';
import { colors } from '../theme/colors';

export function DashboardHeader({ profile, onSignOut }: { profile: UserProfile; onSignOut: () => void }) {
  const initials = profile.username.slice(0, 2).toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>MYBUS LIVE · PASSENGER</Text>
        <Text style={styles.greeting}>Hi, {profile.username}</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Sign out" onPress={onSignOut} style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  copy: {
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
    fontSize: 12,
    marginTop: 4,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#DFEAE6',
    borderRadius: 21,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  avatarText: {
    color: colors.green,
    fontSize: 13,
    fontWeight: '900',
  },
});
