import {
  addDoc,
  collection,
  collectionGroup,
  CollectionReference,
  DocumentReference,
  Firestore,
  getDocs,
  getFirestore,
  Query,
  Timestamp,
} from "firebase/firestore";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import { IAnswer, IAnswerAttributes } from "@App/lib/answer/model";
import { IInterviewQuestion } from "@App/lib/interviewQuestion/models";

class AnswerService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();
    this.firestore = getFirestore(this.app);
  }

  private getCollectionRef(
    userId: string,
    interviewId: string,
    questionId: string
  ) {
    return collection(
      this.firestore,
      "users",
      userId,
      "interviews",
      interviewId,
      "questions",
      questionId,
      "answers"
    ) as CollectionReference<IAnswer>;
  }

  private getCollectionGroupRef() {
    return collectionGroup(this.firestore, "answers") as Query<IAnswer>;
  }

  async addAnswer(
    ref:
      | DocumentReference<IInterviewQuestion>
      | { userId: string; interviewId: string; questionId: string },
    answerAttr: IAnswerAttributes
  ) {
    const collectionRef =
      ref instanceof DocumentReference
        ? (collection(
            this.firestore,
            ref.path,
            "answers"
          ) as CollectionReference<IAnswer>)
        : this.getCollectionRef(ref.userId, ref.interviewId, ref.questionId);

    const answer = { ...answerAttr, createdAt: Timestamp.now() };

    return addDoc(collectionRef, answer);
  }

  async getAllAnswers() {
    const collectionGroupRef = this.getCollectionGroupRef();

    return getDocs(collectionGroupRef);
  }
}

export default new AnswerService();
