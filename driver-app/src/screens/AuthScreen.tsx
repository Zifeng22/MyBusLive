import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { AuthForm } from '../components/AuthForm';
import { AuthRoleSelector } from '../components/AuthRoleSelector';
import { logAuthEvent } from '../services/analytics';
import { login, register } from '../services/authApi';
import { ApiError } from '../services/apiClient';
import { colors } from '../theme/colors';
import type { AccountRole, AuthResult } from '../types';

type AuthScreenProps = {
  appRole: AccountRole;
  initialError?: string;
  onAuthenticated: (result: AuthResult) => Promise<void>;
};

export function AuthScreen({ appRole, initialError = '', onAuthenticated }: AuthScreenProps) {
  const [role, setRole] = useState<AccountRole>(appRole);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(initialError);

  const submit = async () => {
    setError('');
    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }
    if (isRegistering && (!email.trim() || !phone.trim() || password.length < 8)) {
      setError('Registration needs an email, phone number, and password of at least 8 characters.');
      return;
    }

    setBusy(true);
    try {
      const result = isRegistering
        ? await register({ role, username: username.trim(), password, email: email.trim(), phone: phone.trim() })
        : await login({ role, username: username.trim(), password });
      void logAuthEvent(isRegistering ? 'sign_up' : 'login').catch((analyticsError: unknown) => {
        console.warn('Firebase Analytics authentication event failed.', analyticsError);
      });
      await onAuthenticated(result);
    } catch (requestError) {
      setError(requestError instanceof ApiError || requestError instanceof Error
        ? requestError.message
        : 'Could not complete the request. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>MYBUS LIVE</Text>
        <Text style={styles.heading}>Your ride,{"\n"}your way.</Text>
        <Text style={styles.description}>Sign in or create an account to continue.</Text>
        <AuthRoleSelector role={role} onChange={(nextRole) => {
          setRole(nextRole);
          setError('');
        }} />
        {role !== appRole ? (
          <Text style={styles.roleNote}>
            This is the {appRole === 'PASSENGER' ? 'passenger-app' : 'driver-app'} project. You can sign in here,
            but the {role.toLowerCase()} dashboard is in the separate {role === 'PASSENGER' ? 'passenger-app' : 'driver-app'} project.
          </Text>
        ) : null}
        <AuthForm
          busy={busy}
          email={email}
          error={error}
          isRegistering={isRegistering}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onPhoneChange={setPhone}
          onSubmit={() => void submit()}
          onToggleMode={() => {
            setIsRegistering((registering) => !registering);
            setError('');
          }}
          onUsernameChange={setUsername}
          password={password}
          phone={phone}
          role={role}
          username={username}
        />
        <Text style={styles.footer}>SECURE SIGN-IN · YOUR ACCOUNT, YOUR JOURNEY</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  eyebrow: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  heading: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.8,
    lineHeight: 39,
    marginTop: 12,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 9,
  },
  roleNote: {
    color: '#695B3C',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 12,
  },
  footer: {
    color: '#9BA5B4',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 22,
    textAlign: 'center',
  },
});
