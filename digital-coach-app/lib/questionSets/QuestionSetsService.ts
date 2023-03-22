import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import FirebaseService from '../firebase/FirebaseService';
import { IBaseQuestion } from '../question/models';

interface IQuestionSetAttributes {
  title: string;
  description: string;
  questions: string[];
  isFeatured: boolean;
  createdBy: string | undefined;
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
      'questionSets'
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
    const isFeaturedFilter = where('isFeatured', '==', true);
    const q = query(collectionRef, isFeaturedFilter);

    return getDocs(q);
  }

  async updateQuestionSet({
    qsid,
    title,
    description,
    questions = [],
  }: {
    qsid: string;
    title?: string;
    description?: string;
    questions?: string[];
  }) {
    const ref = this.getCollectionRef();

    const foundQuestionSet = (await getDoc(doc(ref, qsid))).data();

    if (!foundQuestionSet) throw new Error('Question set not found');

    await setDoc(
      doc(ref, qsid),
      {
        ...foundQuestionSet,
        title: title || foundQuestionSet.title,
        description: description || foundQuestionSet.description,
        questions: questions || foundQuestionSet.questions,
      },
      { merge: true }
    );
    return await getDoc(doc(ref, qsid));
  }

  async addQuestionToSet(qsid: string, qid: string) {
    const questionSetRef = this.getCollectionRef();
    const questionsRef = collection(
      this.firestore,
      'questions'
    ) as CollectionReference<IBaseQuestion>;

    const foundQuestionSet = await getDoc(doc(questionSetRef, qsid));
    const foundQuestion = await getDoc(doc(questionsRef, qid));

    if (!foundQuestionSet)
      throw new Error('Error adding question set: Question set not found!');
    if (!foundQuestion)
      throw new Error('Error adding question set: Question not found!');

    if (foundQuestionSet.data()?.questions.includes(qid))
      throw new Error(
        'Error adding question set: Question already exists in set!'
      );

    await updateDoc(doc(questionSetRef, qsid), {
      questions: arrayUnion(qid),
    });
  }
}

export default new QuestionSetsService();
