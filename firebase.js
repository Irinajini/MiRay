import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './appConfig.js';

export const firebaseReady = Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);
export const app = firebaseReady ? initializeApp(FIREBASE_CONFIG) : null;
export const auth = firebaseReady ? getAuth(app) : null;
export const db = firebaseReady ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
