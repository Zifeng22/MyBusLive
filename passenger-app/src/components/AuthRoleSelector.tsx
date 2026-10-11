import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AccountRole } from '../types';
import { colors } from '../theme/colors';

type AuthRoleSelectorProps = {
  role: AccountRole;
  onChange: (role: AccountRole) => void;
};

const roles: { value: AccountRole; label: string }[] = [
  { value: 'PASSENGER', label: 'Passenger' },
  { value: 'DRIVER', label: 'Driver' },
];

export function AuthRoleSelector({ role, onChange }: AuthRoleSelectorProps) {
  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {roles.map((item) => {
        const selected = role === item.value;
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            key={item.value}
            onPress={() => onChange(item.value)}
            style={[styles.option, selected && styles.selectedOption]}
          >
            <Text style={[styles.label, selected && styles.selectedLabel]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8ECEF',
    borderRadius: 13,
    flexDirection: 'row',
    marginTop: 26,
    padding: 4,
  },
  option: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 42,
  },
  selectedOption: {
    backgroundColor: colors.white,
    elevation: 1,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  selectedLabel: {
    color: colors.ink,
    fontWeight: '800',
  },
});
