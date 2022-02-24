import {
  addDoc,
  collection,
  collectionGroup,
  CollectionReference,
  DocumentReference,
  Firestore,
  getDocs,
  getFirestore,
  query,
  Query,
  where,
} from "firebase/firestore";

import {
  IBaseInterviewQuestionAttributes,
  IInterviewQuestion,
} from "@App/lib/interviewQuestion/models";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import { IInterviewAttributes } from "@App/lib/interview/models";
import { IQuestion } from "@App/lib/question/models";

class InterviewQuestionService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getCollectionRef(userId: string, interviewId: string) {
    return collection(
      this.firestore,
      "users",
      userId,
      "interviews",
      interviewId,
      "questions"
    ) as CollectionReference<IInterviewQuestion>;
  }

  private getCollectionGroupRef() {
    return collectionGroup(
      this.firestore,
      "questions"
    ) as Query<IInterviewQuestion>;
  }

  async getAllInterviewQuestions() {
    const groupQuery = query(this.getCollectionGroupRef());
    return getDocs(groupQuery);
  }

  async getUnreviewQuestions() {
    const groupQuery = query(
      this.getCollectionGroupRef(),
      where("review", "==", null)
    );

    return getDocs(groupQuery);
  }

  async addQuestion(
    baseQuestion: IQuestion,
    questionsAttributes: IBaseInterviewQuestionAttributes,
    ref:
      | DocumentReference<IInterviewAttributes>
      | { userId: string; interviewId: string }
  ) {
    const collectionRef =
      ref instanceof DocumentReference
        ? (collection(
            this.firestore,
            ref.path,
            "questions"
          ) as CollectionReference<IInterviewQuestion>)
        : this.getCollectionRef(ref.userId, ref.interviewId);

    const question: IInterviewQuestion = {
      ...baseQuestion,
      ...questionsAttributes,
      review: null,
      score: null,
      answeredAt: null,
    };

    return addDoc(collectionRef, question);
  }
}

export default new InterviewQuestionService();
