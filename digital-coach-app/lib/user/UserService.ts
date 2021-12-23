import { FirebaseApp, getApp } from "firebase/app";
import { doc, Firestore, getFirestore, setDoc } from "firebase/firestore";
import moment from "moment";
import FireBaseService from "../firebase/FirebaseService";

class UserService extends FireBaseService {
  db: Firestore;

  constructor() {
    super();

    this.db = getFirestore(this.app);
  }

  async createNewUser(userId: string) {
    const userDocRef = doc(this.db, "users", userId);

    const userDoc = {
      id: userId,
      firstName: "",
      lastName: "",
      registrationCompletedAt: null,
      createdAt: moment().toDate().getTime(),
    };

    return await setDoc(userDocRef, userDoc);
  }
}

export default new UserService();
