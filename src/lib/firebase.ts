import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV2a5fUmYT5auX7lc2f2ZWoAGyf2lKFWc",
  authDomain: "swasthya-42ae5.firebaseapp.com",
  projectId: "swasthya-42ae5",
  storageBucket: "swasthya-42ae5.appspot.com",
  messagingSenderId: "271708715566",
  appId: "1:271708715566:web:3374cebe5c0ea53e1cbdbf",
  measurementId: "G-0BK6R960CJ"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error: any) {
  if (error.code !== 'app/duplicate-app') {
    console.error('Firebase initialization error:', error);
  }
  app = initializeApp(firebaseConfig, 'swasthya-app');
}

// Initialize Firebase services
export const auth = getAuth(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;
