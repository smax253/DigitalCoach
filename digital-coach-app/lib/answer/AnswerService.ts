import { Firestore, getFirestore } from "firebase/firestore";
import FirebaseService from "../firebase/FirebaseService";

class AnswerService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();
    this.firestore = getFirestore(this.app);
  }

  async addAnswer(userId: string, interviewId: string, answer: any) {}
}

export default new AnswerService();
