import { FirebaseApp, getApp } from "firebase/app";
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

class AuthService {
  auth: Auth;

  constructor(firebaseApp: FirebaseApp) {
    this.auth = getAuth(firebaseApp);
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}

export default new AuthService(getApp());
