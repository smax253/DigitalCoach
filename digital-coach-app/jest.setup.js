import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from "firebase/app";

import { firebaseConfig } from "@App/lib/firebase/firebase.config";

configure({ adapter: new Adapter() });

const localIp = "localhost";

if (!getApps.length) {
  const app = initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    if ("measurementId" in firebaseConfig) {
      getAnalytics();
    }
  }

  const auth = getAuth(app);
  connectAuthEmulator(auth, `http://${localIp}:9099`, {
    disableWarnings: true,
  });

  const db = getFirestore(app);
  connectFirestoreEmulator(db, localIp, 8080);

  const storage = getStorage(app);
  connectStorageEmulator(storage, localIp, 9199);
}
