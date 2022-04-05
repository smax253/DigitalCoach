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
  where,
  query,
} from "firebase/firestore";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import { IAnswer, IAnswerAttributes } from "@App/lib/answer/model";
import { TInterviewQuestionDocumentReference } from "@App/lib/interviewQuestion/models";

class AnswerService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();
    this.firestore = getFirestore(this.app);
  }

  private getCollectionRef(ref: TInterviewQuestionDocumentReference) {
    return (
      ref instanceof DocumentReference
        ? collection(ref, "answers")
        : collection(
            this.firestore,
            "users",
            ref.userId,
            "interviews",
            ref.interviewId,
            "questions",
            ref.questionId,
            "answers"
          )
    ) as CollectionReference<IAnswer>;
  }

  private getCollectionGroupRef() {
    return collectionGroup(this.firestore, "answers") as Query<IAnswer>;
  }

  async addAnswer(
    ref: TInterviewQuestionDocumentReference,
    answerAttr: IAnswerAttributes
  ) {
    const collectionRef = this.getCollectionRef(ref);

    const answer = { ...answerAttr, createdAt: Timestamp.now() };

    return addDoc(collectionRef, answer);
  }

  async getAllAnswers() {
    const collectionGroupRef = this.getCollectionGroupRef();

    return getDocs(collectionGroupRef);
  }

  async getAnswersByUserId(userId: string) {
    const collectionGroupRef = this.getCollectionGroupRef();

    return getDocs(query(collectionGroupRef, where("userId", "==", userId)));
  }

  async getAnswers(ref: TInterviewQuestionDocumentReference) {
    const collectionRef = this.getCollectionRef(ref);

    return getDocs(collectionRef);
  }
}

export default new AnswerService();
