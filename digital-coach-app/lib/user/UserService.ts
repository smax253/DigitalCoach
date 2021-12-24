import { User as FirebaseUser } from "firebase/auth";
import {
  doc,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import FireBaseService from "../firebase/FirebaseService";

export interface UserDetails {
  avatarUrl: string;
  name: string;
  concentration: string;
  proficiency: string;
}

export interface User extends UserDetails {
  id: string;
  email: string;
  registrationCompletedAt: number;
  createdAt: number;
}

class UserService extends FireBaseService {
  db: Firestore;

  constructor() {
    super();

    this.db = getFirestore(this.app);
  }

  getUserDocRef(userId: string) {
    return doc(this.db, "users", userId);
  }

  async createNewUser(user: FirebaseUser) {
    const userDocRef = this.getUserDocRef(user.uid);

    const userDoc = {
      id: user.uid,
      email: user.email,
      name: "",
      avatarUrl: "",
      concentration: "",
      proficiency: "",
      registrationCompletedAt: null,
      createdAt: moment().toDate().getTime(),
    };

    return await setDoc(userDocRef, userDoc);
  }

  async registerUser(userId: string, userDetails: UserDetails) {
    const userDocRef = this.getUserDocRef(userId);

    return await updateDoc(userDocRef, {
      ...userDetails,
      registrationCompletedAt: moment().toDate().getTime(),
    });
  }

  async getUser(userId: string): Promise<User> {
    const userDocRef = this.getUserDocRef(userId);

    try {
      return (await (await getDoc(userDocRef)).data()) as User;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
