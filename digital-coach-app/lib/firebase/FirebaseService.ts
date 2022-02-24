import { FirebaseApp, getApp } from "firebase/app";
import "@App/lib/firebase/firebase.config";

export default class FirebaseService {
  app: FirebaseApp;

  constructor() {
    this.app = getApp();
  }
}
