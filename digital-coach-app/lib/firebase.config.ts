import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator, initializeAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const localIp = "localhost";

if (!getApps.length) {
  initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    if ("measurementId" in firebaseConfig) {
      getAnalytics();
    }
  }
}

const app = initializeApp(firebaseConfig);
initializeAuth(app);

if (typeof window !== "undefined") getAnalytics(app);

const auth = getAuth(app);
connectAuthEmulator(auth, `http://${localIp}:9099`, { disableWarnings: true });

const db = getFirestore(app);
connectFirestoreEmulator(db, localIp, 8080);

const storage = getStorage(app);
connectStorageEmulator(storage, localIp, 9199);
