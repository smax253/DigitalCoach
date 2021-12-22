import { FirebaseApp, getApp } from "firebase/app";
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged as firebaseOnAuthStateChanged,
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

  onAuthStateChanged(callback: (user: User | null) => void) {
    firebaseOnAuthStateChanged(this.auth, callback);
  }
}

export default new AuthService(getApp());
