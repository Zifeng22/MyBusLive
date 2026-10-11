export async function initializeAnalytics(): Promise<void> {
  throw new Error('Firebase Analytics is not configured for this platform.');
}

export async function logAuthEvent(_eventName: 'login' | 'sign_up'): Promise<void> {
  throw new Error('Firebase Analytics is not configured for this platform.');
}
