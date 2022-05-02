import FirebaseService from "@App/lib/firebase/FirebaseService";
import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
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

  /**
   * This function takes a base question object, adds a timestamp to it, and then adds it to the
   * database.
   * @param {IBaseQuestionAttributes} baseQuestion - IBaseQuestionAttributes
   * @returns A promise that resolves to the document ID of the newly created document.
   */
  async addQuestion(baseQuestion: IBaseQuestionAttributes) {
    const question: IBaseQuestion = {
      ...baseQuestion,
      lastUpdatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    };

    return addDoc(this.getCollectionRef(), question);
  }

  /**
   * This function returns a promise that resolves to an array of objects, each of which represents a
   * question.
   * @returns An array of objects.
   */
  async getAllQuestions() {
    return getDocs(this.getCollectionRef());
  }

  /**
   * It returns a promise that resolves to an array of documents that match the given subject
   * @param {TSubject} subject - TSubject - the subject to filter by
   * @returns An array of documents that match the query.
   */
  async getBySubject(subject: TSubject) {
    const ref = this.getCollectionRef();

    const filter = where("subject", "==", subject);

    return getDocs(query(ref, filter));
  }
}

export default new QuestionService();
