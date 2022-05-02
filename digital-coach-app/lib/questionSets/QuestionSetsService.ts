import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import FirebaseService from "../firebase/FirebaseService";

interface IQuestionSetAttributes {
  title: string;
  description: string;
  questions: string[];
  isFeatured: boolean;
}

interface IQuestionSet extends IQuestionSetAttributes {
  createdAt: Timestamp;
}

class QuestionSetsService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getCollectionRef() {
    return collection(
      this.firestore,
      "questionSets"
    ) as CollectionReference<IQuestionSet>;
  }

  /**
   * This function creates a new question set in the database and returns a promise that resolves to
   * the newly created question set.
   * @param {IQuestionSetAttributes} questionSetAttr - IQuestionSetAttributes
   * @returns A promise that resolves to a document reference.
   */
  createQuestionSet(questionSetAttr: IQuestionSetAttributes) {
    const collectionRef = this.getCollectionRef();

    const questionSet = {
      ...questionSetAttr,
      createdAt: Timestamp.now(),
    };

    return addDoc(collectionRef, questionSet);
  }

  getAllQuestionSets() {
    const collectionRef = this.getCollectionRef();

    return getDocs(collectionRef);
  }

  /**
   * Get all the documents in the collection where the isFeatured field is true.
   * @returns An array of question sets.
   */
  getFeaturedQuestionSets() {
    const collectionRef = this.getCollectionRef();
    const isFeaturedFilter = where("isFeatured", "==", true);
    const q = query(collectionRef, isFeaturedFilter);

    return getDocs(q);
  }
}

export default new QuestionSetsService();
