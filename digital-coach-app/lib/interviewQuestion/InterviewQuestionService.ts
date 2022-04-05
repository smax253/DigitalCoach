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
  updateDoc,
} from "firebase/firestore";

import {
  IBaseInterviewQuestionAttributes,
  IInterviewQuestion,
} from "@App/lib/interviewQuestion/models";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import { TInterviewDocumentReference } from "@App/lib/interview/models";
import { IQuestion } from "@App/lib/question/models";

class InterviewQuestionService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getCollectionRef(ref: TInterviewDocumentReference) {
    console.log(ref);
    const collectionRef = (
      ref instanceof DocumentReference
        ? collection(ref, "interviewQuestions")
        : collection(
            this.firestore,
            "users",
            ref.userId,
            "interviews",
            ref.interviewId,
            "interviewQuestions"
          )
    ) as CollectionReference<IInterviewQuestion>;

    console.log(collectionRef.path);
    return collectionRef;
  }

  private getCollectionGroupRef() {
    return collectionGroup(
      this.firestore,
      "interviewQuestions"
    ) as Query<IInterviewQuestion>;
  }

  async getAllInterviewQuestions() {
    const groupQuery = query(this.getCollectionGroupRef());
    return getDocs(groupQuery);
  }

  async getInterviewQuestions(ref: TInterviewDocumentReference) {
    return getDocs(this.getCollectionRef(ref));
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
    ref: TInterviewDocumentReference
  ) {
    const collectionRef = this.getCollectionRef(ref);

    const question: IInterviewQuestion = {
      ...baseQuestion,
      ...questionsAttributes,
      review: null,
      score: null,
      answeredAt: null,
    };

    return addDoc(collectionRef, question);
  }
  async getQuestion(questionId: string) {
    const groupQuery = query(
      this.getCollectionGroupRef(),
      where("id", "==", questionId)
    );
    return getDocs(groupQuery);
  }
  async scoreQuestion(
    questionRef: DocumentReference<IInterviewQuestion>,
    score: number
  ) {
    return updateDoc(questionRef, { score: score });
  }

  async getUserAverageScore(userId: string) {
    const interviews = await collection(
      this.firestore,
      "users",
      userId,
      "interviews"
    );
    const interviewIds = (await getDocs(interviews)).docs.map(
      (interview) => interview.id
    );

    const fetchQuestions = (interviewId: string) =>
      getDocs(
        collection(
          this.firestore,
          "users",
          userId,
          "interviews",
          interviewId,
          "interviewQuestions"
        ) as CollectionReference<IInterviewQuestion>
      );
    const questions = await Promise.all(interviewIds.map(fetchQuestions));

    const gradedScores = questions
      .map((questions) =>
        questions.docs.map((question) => question.data().score)
      )
      .flat()
      .filter(
        (score): score is number => score !== null && score !== undefined
      );
    return (
      gradedScores.reduce((acc, score) => acc + score, 0) / gradedScores.length
    );
  }
}

export default new InterviewQuestionService();
