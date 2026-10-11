import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDUkvT7VtKWBwBNG-QiB3Vah9DQIl4yn8',
  authDomain: 'mybuslive-c99e8.firebaseapp.com',
  projectId: 'mybuslive-c99e8',
  storageBucket: 'mybuslive-c99e8.firebasestorage.app',
  messagingSenderId: '105147374319',
  appId: '1:105147374319:web:44f90bb7440b5019f0991a',
  measurementId: 'G-Z2E9Y3C6JT',
};

let analyticsPromise: Promise<Analytics | null> | undefined;

async function getWebAnalytics(): Promise<Analytics | null> {
  analyticsPromise ??= (async () => {
    if (!(await isSupported())) return null;
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    return getAnalytics(app);
  })();
  return analyticsPromise;
}

export async function initializeAnalytics(): Promise<void> {
  await getWebAnalytics();
}

export async function logAuthEvent(eventName: 'login' | 'sign_up'): Promise<void> {
  const instance = await getWebAnalytics();
  if (instance && eventName === 'login') {
    logEvent(instance, 'login', { method: 'password' });
  } else if (instance) {
    logEvent(instance, 'sign_up', { method: 'password' });
  }
}
