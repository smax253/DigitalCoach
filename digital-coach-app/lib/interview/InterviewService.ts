import { Firestore, getFirestore, Timestamp } from "firebase/firestore";
import FireBaseService from "../firebase/FirebaseService";

interface IAnswer {
  videoUrl: string;
  duration: number;
  isSubmission: boolean;
  createdAt: Timestamp;
}

interface IQuestion {
  subject: string;
  question: string;
  timeLimit: number;
  retries: number;
  score: number;
  review: unknown
  answers: IAnswer[];
  answeredAt: Timestamp;
}

interface IInterview {
  id: string;
  title: string;
  questions: IQuestion[];
  completedAt: Timestamp;
  reviewedAt: Timestamp;
  createdAt: Timestamp;
}

class InterviewService extends FireBaseService {
  private db: Firestore;

  constructor() {
    super();

    this.db = getFirestore(this.app);
  }
}

export default new InterviewService();
