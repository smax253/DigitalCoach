import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

import { firebaseConfig } from "@App/lib/firebase/firebase.config";

configure({ adapter: new Adapter() });

const localIp = "localhost";

if (!getApps.length) {
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  connectAuthEmulator(auth, `http://${localIp}:9099`, {
    disableWarnings: true,
  });

  getFirestore(app);

  const storage = getStorage(app);
  connectStorageEmulator(storage, localIp, 9199);
}
