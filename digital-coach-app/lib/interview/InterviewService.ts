import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import {
  IBaseInterview,
  IBaseInterviewQuestion,
  IInterview,
  IInterviewAttributes,
  IInterviewQuestion,
} from "@App/lib/interview/models";
import { IQuestion } from "@App/lib/question/models";

class InterviewService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getDocRef(userId: string, interviewId: string) {
    return doc(this.firestore, "users", userId, "interviews", interviewId);
  }

  private getCollectionRef(userId: string) {
    return collection(this.firestore, "users", userId, "interviews");
  }

  async create(
    userId: string,
    baseInterview: IBaseInterview,
    baseQuestions: IQuestion[],
    questionsAttributes: IBaseInterviewQuestion
  ) {
    const collectionRef = this.getCollectionRef(userId);
    const questions: IInterviewQuestion[] = baseQuestions.map(
      (baseQuestion) => ({
        ...baseQuestion,
        ...questionsAttributes,
        review: null,
        score: null,
        answers: [],
        answeredAt: null,
      })
    );

    const interview: IInterviewAttributes = {
      ...baseInterview,
      questions,
      completedAt: null,
      reviewedAt: null,
      createdAt: Timestamp.now(),
    };

    return await setDoc(doc(collectionRef), interview);
  }

  async fetchUserInterviews(userId: string) {
    const collectionRef = this.getCollectionRef(userId);

    return await getDocs(collectionRef);
  }

  async fetchInterview(userId: string, interviewId: string) {
    const docRef = this.getDocRef(userId, interviewId);

    return (await (await getDoc(docRef)).data()) as IInterview;
  }

  async addAnswer(userId: string, interviewId: string) {}
}

export default new InterviewService();
