import { User as FirebaseUser } from "firebase/auth";
import {
  doc,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import { IUser, IUserDetails } from "@App/lib/user/models";

class UserService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getUserDocRef(userId: string) {
    return doc(this.firestore, "users", userId);
  }

  async add(user: IUser) {
    const userDocRef = this.getUserDocRef(user.id);

    return setDoc(userDocRef, user);
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
      createdAt: Timestamp.now(),
    };

    return await setDoc(userDocRef, userDoc);
  }

  async registerUser(userId: string, userDetails: IUserDetails) {
    const userDocRef = this.getUserDocRef(userId);

    return await updateDoc(userDocRef, {
      ...userDetails,
      registrationCompletedAt: Timestamp.now(),
    });
  }

  async getUser(userId: string): Promise<IUser> {
    const userDocRef = this.getUserDocRef(userId);

    try {
      return (await (await getDoc(userDocRef)).data()) as IUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
