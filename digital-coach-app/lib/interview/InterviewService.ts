import {
  addDoc,
  collection,
  collectionGroup,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  Query,
  query,
  Timestamp,
} from "firebase/firestore";
import FirebaseService from "@App/lib/firebase/FirebaseService";
import {
  IBaseInterview,
  IInterviewAttributes,
} from "@App/lib/interview/models";

class InterviewService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getCollectionGroupRef() {
    return collectionGroup(
      this.firestore,
      "interviews"
    ) as Query<IInterviewAttributes>;
  }

  private getDocRef(userId: string, interviewId: string) {
    return doc(
      this.firestore,
      "users",
      userId,
      "interviews",
      interviewId
    ) as DocumentReference<IInterviewAttributes>;
  }

  private getCollectionRef(userId: string) {
    return collection(
      this.firestore,
      "users",
      userId,
      "interviews"
    ) as CollectionReference<IInterviewAttributes>;
  }

  async create(userId: string, baseInterview: IBaseInterview) {
    const collectionRef = this.getCollectionRef(userId);

    const interview: IInterviewAttributes = {
      ...baseInterview,
      completedAt: null,
      reviewedAt: null,
      createdAt: Timestamp.now(),
    };

    return addDoc(collectionRef, interview);
  }

  async fetchUserInterviews(userId: string) {
    const collectionRef = this.getCollectionRef(userId);

    return getDocs(collectionRef);
  }

  async fetchInterview(userId: string, interviewId: string) {
    const docRef = this.getDocRef(userId, interviewId);

    return getDoc(docRef);
  }

  async getAllInterviews() {
    const groupQuery = query(this.getCollectionGroupRef());
    
    return getDocs(groupQuery);
  }
}

export default new InterviewService();
