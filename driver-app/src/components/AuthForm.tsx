import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { AccountRole } from '../types';
import { colors } from '../theme/colors';

type AuthFormProps = {
  role: AccountRole;
  isRegistering: boolean;
  username: string;
  password: string;
  email: string;
  phone: string;
  busy: boolean;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
  onToggleMode: () => void;
};

export function AuthForm(props: AuthFormProps) {
  const title = props.role === 'PASSENGER' ? 'Passenger account' : 'Driver account';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.isRegistering ? `Create ${title.toLowerCase()}` : `Welcome back`}</Text>
      <Text style={styles.subtitle}>
        {props.isRegistering ? 'Register to get started with MyBus Live.' : `Sign in to your ${title.toLowerCase()}.`}
      </Text>

      <Field
        autoCapitalize="none"
        label="USERNAME"
        onChangeText={props.onUsernameChange}
        placeholder="Your username"
        value={props.username}
      />

      {props.isRegistering ? (
        <>
          <Field
            autoCapitalize="none"
            keyboardType="email-address"
            label="EMAIL"
            onChangeText={props.onEmailChange}
            placeholder="you@example.com"
            value={props.email}
          />
          <Field
            keyboardType="phone-pad"
            label="PHONE"
            onChangeText={props.onPhoneChange}
            placeholder="Your phone number"
            value={props.phone}
          />
        </>
      ) : null}

      <Field
        autoCapitalize="none"
        label="PASSWORD"
        onChangeText={props.onPasswordChange}
        placeholder={props.isRegistering ? 'At least 8 characters' : 'Your password'}
        secureTextEntry
        value={props.password}
      />

      {props.error ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {props.error}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        disabled={props.busy}
        onPress={props.onSubmit}
        style={({ pressed }) => [
          styles.submit,
          (pressed || props.busy) && styles.pressed,
        ]}
      >
        <Text style={styles.submitText}>
          {props.busy ? 'Please wait…' : props.isRegistering ? 'Create account' : 'Sign in'}
        </Text>
      </Pressable>

      <Pressable accessibilityRole="button" disabled={props.busy} onPress={props.onToggleMode}>
        <Text style={styles.switchText}>
          {props.isRegistering ? 'Already registered? Sign in' : 'New to MyBus Live? Register'}
        </Text>
      </Pressable>
    </View>
  );
}

function Field({
  label,
  ...props
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  autoCapitalize?: 'none' | 'sentences';
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        autoCapitalize={props.autoCapitalize ?? 'sentences'}
        autoCorrect={false}
        keyboardType={props.keyboardType ?? 'default'}
        maxLength={label === 'PASSWORD' ? 72 : 255}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor="#9BA5B4"
        secureTextEntry={props.secureTextEntry}
        style={styles.input}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
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
    marginBottom: 18,
    marginTop: 6,
  },
  field: {
    backgroundColor: '#F7F9FA',
    borderColor: colors.line,
    borderRadius: 11,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingTop: 9,
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
    minHeight: 38,
    paddingVertical: 7,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  submit: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 2,
    minHeight: 47,
  },
  submitText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
  switchText: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 16,
    textAlign: 'center',
  },
});
