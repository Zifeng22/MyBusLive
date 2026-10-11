import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function WalletCard({ balance }: { balance: number | null }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.eyebrow}>MY WALLET</Text>
          <Text style={styles.balance}>
            {balance === null ? 'Unavailable' : `RM ${balance.toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.icon}>
          <Text style={styles.iconText}>RM</Text>
        </View>
      </View>
      <Text style={styles.caption}>Live balance from your account · secure top-up is not configured</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.ink,
    borderRadius: 18,
    marginBottom: 22,
    padding: 18,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: '#B8C2D3',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  balance: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 7,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: '#27334A',
    borderRadius: 13,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  iconText: {
    color: '#B7F0D9',
    fontSize: 12,
    fontWeight: '900',
  },
  caption: {
    color: '#B8C2D3',
    fontSize: 10,
    marginTop: 12,
  },
});
