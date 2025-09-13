import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV2a5fUmYT5auX7lc2f2ZWoAGyf2lKFWc",
  authDomain: "swasthya-42ae5.firebaseapp.com",
  projectId: "swasthya-42ae5",
  storageBucket: "swasthya-42ae5.appspot.com",
  messagingSenderId: "271708715566",
  appId: "1:271708715566:web:b1e23f2dd289915c1cbdbf",
  measurementId: "G-P3RZMGVLY6"
};

// Initialize Firebase
let app;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  // Only initialize analytics in the browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error: any) {
  if (error.code !== 'app/duplicate-app') {
    console.error('Firebase initialization error:', error);
  }
}

// Initialize Firebase Authentication
const auth = getAuth(app);

// Set persistence to LOCAL to keep the user logged in
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

export { auth, analytics };
