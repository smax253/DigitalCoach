import FirebaseService from "@App/lib/firebase/FirebaseService";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  IBaseQuestion,
  IBaseQuestionAttributes,
  IQuestion,
  TSubject,
} from "@App/lib/question/models";

class QuestionService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getCollectionRef() {
    return collection(
      this.firestore,
      "questions"
    ) as CollectionReference<IBaseQuestion>;
  }

  private docToModel(doc: QueryDocumentSnapshot<IBaseQuestion>): IQuestion {
    return {
      gid: doc.id,
      ...(doc.data() as IBaseQuestion),
    };
  }

  async addQuestion(baseQuestion: IBaseQuestionAttributes) {
    const question: IBaseQuestion = {
      ...baseQuestion,
      lastUpdatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    };

    return setDoc(doc(this.getCollectionRef()), question);
  }

  async getAllQuestions() {
    return getDocs(this.getCollectionRef());
  }

  async getBySubject(subject: TSubject) {
    const ref = this.getCollectionRef();
    const filter = where("subject", "==", subject);

    return getDocs(query(ref, filter));
  }
}

export default new QuestionService();
