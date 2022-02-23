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
  createUserWithEmailAndPassword,
} from "firebase/auth";
import FirebaseService from "@App/lib/firebase/FirebaseService";

class AuthService extends FirebaseService {
  auth: Auth;

  constructor() {
    super();

    this.auth = getAuth(this.app);
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  isSignedIn() {
    return !!this.auth.currentUser?.uid;
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    firebaseOnAuthStateChanged(this.auth, callback);
  }
}

export default new AuthService();
