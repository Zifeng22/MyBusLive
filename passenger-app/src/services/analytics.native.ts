import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from '@react-native-firebase/analytics';

export async function initializeAnalytics(): Promise<void> {
  await setAnalyticsCollectionEnabled(getAnalytics(), true);
}

export async function logAuthEvent(eventName: 'login' | 'sign_up'): Promise<void> {
  if (eventName === 'login') {
    await logEvent(getAnalytics(), 'login', { method: 'password' });
  } else {
    await logEvent(getAnalytics(), 'sign_up', { method: 'password' });
  }
}
