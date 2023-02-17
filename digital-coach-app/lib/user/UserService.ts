import { User as FirebaseUser} from "firebase/auth";
import {
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import { IUser, IBaseUserAttributes } from "@App/lib/user/models";
import AuthService from "../auth/AuthService";

class UserService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getDocRef(userId: string) {
    return doc(this.firestore, "users", userId) as DocumentReference<IUser>;
  }

  async add(userId: string, user: IUser) {
    const userDocRef = this.getDocRef(userId);

    return setDoc(userDocRef, user);
  }

  /**
   * This function creates a new user in the database, and returns a promise that resolves when the
   * user is created.
   * @param {FirebaseUser} user - FirebaseUser
   * @returns A promise.
   */
  async createNewUser(user: FirebaseUser) {
    const userDocRef = this.getDocRef(user.uid);

    const userDoc = {
      id: user.uid,
      email: user.email || "",
      name: "",
      avatarUrl: "",
      concentration: null,
      proficiency: null,
      registrationCompletedAt: null,
      createdAt: Timestamp.now(),
    };

    return setDoc(userDocRef, userDoc);
  }

  /**
   * This function takes a userId and userDetails and returns a promise that resolves to the result of
   * updating the user's document with the userDetails and a timestamp.
   * @param {string} userId - string - The user's ID
   * @param {IBaseUserAttributes} userDetails - IBaseUserAttributes
   * @returns The return value is a promise that resolves to the result of the update operation.
   */
  async registerUser(userId: string, userDetails: IBaseUserAttributes) {
    const userDocRef = this.getDocRef(userId);

    return updateDoc(userDocRef, {
      ...userDetails,
      registrationCompletedAt: Timestamp.now(),
    });
  }

  /**
   * This function gets a user document from the database, and returns it.
   * @param {string} userId - string - The user's id
   * @returns The user object.
   */
  async getUser(userId: string) {
    const userDocRef = this.getDocRef(userId);

    try {
      return await getDoc(userDocRef);
    } catch (error) {
      throw error;
    }
  }

  /**
   * This function gets the current user's id
   * @param none
   * @returns The user's id
   */
  getUserId(){
    return AuthService.auth.currentUser?.uid;
  }
}

export default new UserService();
