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
import { IInterviewAttributes } from "@App/lib/interview/models";
import { IQuestion } from "@App/lib/question/models";
import { number } from "yup/lib/locale";

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
      "interviewQuestions"
    ) as CollectionReference<IInterviewQuestion>;
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
            "interviewQuestions"
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
  async getQuestion(questionId: string){
    const groupQuery = query(
      this.getCollectionGroupRef(),
      where("id", "==", questionId)
    );
    return getDocs(groupQuery);
  }
  async scoreQuestion(questionRef: DocumentReference<IInterviewQuestion>, score: number){
    return updateDoc(questionRef, {score: score});
  }

  async getUserAverageScore(userId: string){
    const interviews = await collection(this.firestore, "users", userId, "interviews");
    const interviewIds = (await getDocs(interviews)).docs.map(interview => interview.id);
    const questions = await Promise.all(
      interviewIds.map(
        interviewId => getDocs(
          (collection(this.firestore, "users", userId, "interviews", interviewId, "interviewQuestions") as CollectionReference<IInterviewQuestion>)
        )
      )
    );
    const gradedScores = questions
                            .map(questions => questions.docs.map(question => question.data().score))
                            .flat()
                            .filter((score):score is number => score !== null && score !== undefined);
    return gradedScores.reduce((acc, score) => acc + score, 0) / gradedScores.length;
  }
}

export default new InterviewQuestionService();
