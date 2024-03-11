// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getFirestore();

export default { app, analytics, auth, database }