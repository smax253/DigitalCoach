import FirebaseService from "@App/lib/firebase/FirebaseService";
import {
  collection,
  doc,
  Firestore,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import {
  IBaseQuestion,
  IBaseQuestionAttributes,
} from "@App/lib/question/models";

class QuestionService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getCollectionRef() {
    return collection(this.firestore, "questions");
  }

  async addQuestion(baseQuestion: IBaseQuestionAttributes) {
    const question: IBaseQuestion = {
      ...baseQuestion,
      lastUpdatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    };

    return setDoc(doc(this.getCollectionRef()), question);
  }
}

export default new QuestionService();
