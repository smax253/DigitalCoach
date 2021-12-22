import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnzDpkrvM4-S_NOv_l_nasRTK8poY6R0Y",
  authDomain: "digital-coach-app.firebaseapp.com",
  projectId: "digital-coach-app",
  storageBucket: "digital-coach-app.appspot.com",
  messagingSenderId: "679495307933",
  appId: "1:679495307933:web:f7997162d1693326c43a74",
  measurementId: "G-NQDBJWRGS8",
};
const localIp = process.env.REACT_APP_LOCAL_IP || "localhost";

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth();
connectAuthEmulator(auth, `http://${localIp}:9099`);

const db = getFirestore();
connectFirestoreEmulator(db, localIp, 8080);

const storage = getStorage();
connectStorageEmulator(storage, localIp, 9199);

export default app;
