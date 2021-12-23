import { FirebaseApp, getApp } from "firebase/app";

export default class FireBaseService {
  app: FirebaseApp;

  constructor() {
    this.app = getApp();
  }
}
