// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.api_key,
  authDomain: Constants.expoConfig.extra.auth_domain,
  projectId: Constants.expoConfig.extra.project_id,
  storageBucket: Constants.expoConfig.extra.storage_bucket,
  messagingSenderId: Constants.expoConfig.extra.messaging_sender_id,
  appId: Constants.expoConfig.extra.app_id,
  measurementId: Constants.expoConfig.extra.measurement_id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize Firebase Analytics if supported
// if (isAnalyticsSupported()) {
//   const analytics = getAnalytics(app);
// }

// Initialize Firebase Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// export const auth = getAuth(app);
export const database = getFirestore();
