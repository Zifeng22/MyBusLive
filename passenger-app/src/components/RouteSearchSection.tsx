import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { Bus, Route } from '../types';
import { colors } from '../theme/colors';

type RouteSearchSectionProps = {
  routes: Route[];
  buses: Bus[];
  onBook: (route: Route, bus: Bus) => void;
};

export function RouteSearchSection({ routes, buses, onBook }: RouteSearchSectionProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searched, setSearched] = useState(false);
  const [validationError, setValidationError] = useState('');

  const matchingRoutes = useMemo(() => {
    if (!searched) return routes.slice(0, 3);
    const from = origin.trim().toLowerCase();
    const to = destination.trim().toLowerCase();
    return routes.filter(
      (route) => route.origin.toLowerCase().includes(from) && route.destination.toLowerCase().includes(to),
    );
  }, [destination, origin, routes, searched]);

  const search = () => {
    if (!origin.trim() || !destination.trim()) {
      setValidationError('Enter both your starting point and destination.');
      setSearched(false);
      return;
    }
    setValidationError('');
    setSearched(true);
  };

  return (
    <View>
      <View style={styles.searchCard}>
        <Text style={styles.title}>Where are you going?</Text>
        <LocationField label="FROM" onChangeText={setOrigin} placeholder="Starting point" value={origin} />
        <LocationField
          label="TO"
          onChangeText={setDestination}
          onSubmitEditing={search}
          placeholder="Destination"
          value={destination}
        />
        {validationError ? <Text style={styles.error}>{validationError}</Text> : null}
        <Pressable accessibilityRole="button" onPress={search} style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}>
          <Text style={styles.searchButtonText}>Find buses</Text>
          <Text style={styles.searchArrow}>→</Text>
        </Pressable>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.title}>{searched ? 'Matching routes' : 'Available routes'}</Text>
        <Text style={styles.count}>{matchingRoutes.length} ROUTES</Text>
      </View>

      {matchingRoutes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No routes found</Text>
          <Text style={styles.emptyBody}>Try different place names or check back when routes are added.</Text>
        </View>
      ) : null}

      {matchingRoutes.map((route) => (
        <RouteCard
          buses={buses.filter((bus) => bus.route?.routeID === route.routeID)}
          key={route.routeID}
          onBook={(bus) => onBook(route, bus)}
          route={route}
        />
      ))}
    </View>
  );
}

function LocationField({
  label,
  onChangeText,
  placeholder,
  value,
  onSubmitEditing,
}: {
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
  onSubmitEditing?: () => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label === 'FROM' ? 'Starting point' : 'Destination'}
        autoCapitalize="words"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="#9BA5B4"
        returnKeyType={label === 'FROM' ? 'next' : 'search'}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

function RouteCard({
  route,
  buses,
  onBook,
}: {
  route: Route;
  buses: Bus[];
  onBook: (bus: Bus) => void;
}) {
  return (
    <View style={styles.routeCard}>
      <View style={styles.routeTop}>
        <View style={styles.routeCode}>
          <Text style={styles.routeCodeText}>ROUTE {route.routeID}</Text>
        </View>
        <Text style={styles.fare}>RM {Number(route.fare).toFixed(2)}</Text>
      </View>
      <View style={styles.path}>
        <View style={styles.markers}>
          <View style={styles.originMarker} />
          <View style={styles.pathLine} />
          <View style={styles.destinationMarker} />
        </View>
        <View style={styles.stops}>
          <View>
            <Text style={styles.stopLabel}>FROM</Text>
            <Text style={styles.stopName}>{route.origin}</Text>
          </View>
          <View>
            <Text style={styles.stopLabel}>TO</Text>
            <Text style={styles.stopName}>{route.destination}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.duration}>
        Approx. {route.estimatedTime} min · {buses.length} {buses.length === 1 ? 'bus' : 'buses'}
      </Text>
      {buses.length === 0 ? (
        <Text style={styles.noBuses}>No buses are currently listed for this route.</Text>
      ) : (
        buses.map((bus) => (
          <View key={bus.busID} style={styles.busRow}>
            <View style={styles.busCopy}>
              <Text style={styles.busName}>{bus.busNumber}</Text>
              <Text style={styles.busMeta}>
                {bus.availableSeats} of {bus.totalSeats} seats · {bus.status || 'Status unavailable'}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              disabled={bus.availableSeats < 1}
              onPress={() => onBook(bus)}
              style={({ pressed }) => [
                styles.bookButton,
                bus.availableSeats < 1 && styles.disabledButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.bookButtonText}>{bus.availableSeats < 1 ? 'Full' : 'Select'}</Text>
            </Pressable>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 22,
    padding: 16,
  },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  field: {
    backgroundColor: '#F7F9FA',
    borderColor: colors.line,
    borderRadius: 11,
    borderWidth: 1,
    marginTop: 11,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  fieldLabel: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  input: {
    color: colors.ink,
    fontSize: 13,
    minHeight: 36,
    paddingVertical: 6,
  },
  error: {
    color: colors.danger,
    fontSize: 11,
    marginTop: 8,
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 46,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  searchArrow: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 8,
  },
  resultsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  count: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  empty: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 12,
    padding: 18,
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '800',
  },
  emptyBody: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  routeCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 15,
  },
  routeTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeCode: {
    backgroundColor: colors.greenLight,
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  routeCodeText: {
    color: colors.green,
    fontSize: 9,
    fontWeight: '900',
  },
  fare: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  path: {
    flexDirection: 'row',
    marginTop: 14,
    minHeight: 76,
  },
  markers: {
    alignItems: 'center',
    marginRight: 12,
    paddingVertical: 2,
    width: 12,
  },
  originMarker: {
    backgroundColor: colors.green,
    borderRadius: 6,
    height: 11,
    width: 11,
  },
  pathLine: {
    backgroundColor: '#C9DCD5',
    flex: 1,
    width: 2,
  },
  destinationMarker: {
    backgroundColor: colors.white,
    borderColor: colors.green,
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    width: 10,
  },
  stops: {
    flex: 1,
    justifyContent: 'space-between',
  },
  stopLabel: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  stopName: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  duration: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 11,
  },
  noBuses: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 12,
  },
  busRow: {
    alignItems: 'center',
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: 11,
    paddingTop: 11,
  },
  busCopy: {
    flex: 1,
  },
  busName: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  busMeta: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },
  bookButton: {
    alignItems: 'center',
    backgroundColor: colors.greenLight,
    borderRadius: 9,
    justifyContent: 'center',
    marginLeft: 10,
    minWidth: 74,
    minHeight: 36,
  },
  disabledButton: {
    backgroundColor: '#E8ECEF',
  },
  bookButtonText: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
});
