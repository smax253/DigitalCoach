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
} from 'firebase/firestore';
import FirebaseService from '@App/lib/firebase/FirebaseService';
import {
  IInterviewSetAttributes,
  TInterviewSetDocumentReference,
} from '@App/lib/interviewSets/models';
import useAuthContext from '@App/lib/auth/AuthContext';

class InterviewSetsService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  /**
   * This function returns a reference to a collection group called interviewSets.
   * @returns A Query<IInterviewSetAttributes>
   */
  private getCollectionGroupRef() {
    return collectionGroup(
      this.firestore,
      'interviewSets'
    ) as Query<IInterviewSetAttributes>;
  }

  /**
   * If the argument is a DocumentReference, return it. Otherwise, return a DocumentReference
   * @param {TInterviewSetDocumentReference} ref - TInterviewSetDocumentReference
   * @returns A DocumentReference&lt;IInterviewSetAttributes&gt;
   */
  getDocRef(ref: TInterviewSetDocumentReference) {
    if (ref instanceof DocumentReference) return ref;

    return doc(
      this.firestore,
      'users',
      ref.userId,
      'interviewSets',
      ref.interviewSetId
    ) as DocumentReference<IInterviewSetAttributes>;
  }

  /**
   * This function returns a reference to a collection of interviewSets for a given user.
   * @param {string} userId - string - the user id of the user who owns the interview
   * @returns A CollectionReference of type IInterviewSetAttributes
   */
  private getCollectionRef(userId: string) {
    console.log(`The userId passed into getCollectionRef is ${userId}`);
    return collection(
      this.firestore,
      'users',
      userId,
      'interviewSets'
    ) as CollectionReference<IInterviewSetAttributes>;
  }

  /**
   * It creates a new interviewSet in the database.
   * @param {string} userId - string
   * @param {IInterviewSetAttributes} interviewSet - The interview set to be added to the db
   * @returns a promise.
   */
  async create(userId: string, interviewSet: IInterviewSetAttributes) {
    console.log('In create function');
    const collectionRef = this.getCollectionRef(userId);
    console.log('After getting collectionRef');
    return addDoc(collectionRef, interviewSet);
  }

  /**
   * This function fetches all the documents in a collection and returns them as an array.
   * @param {string} userId - string - the user id of the user whose interviews we want to fetch
   * @returns An array of documents.
   */
  fetchUserInterviewSets(userId: string) {
    const collectionRef = this.getCollectionRef(userId);

    return getDocs(collectionRef);
  }

  /**
   * It returns a promise that resolves to a document snapshot
   * @param {TInterviewDocumentReference} ref - TInterviewSetDocumentReference
   * @returns A promise that resolves to a document snapshot.
   */
  async fetchInterview(ref: TInterviewSetDocumentReference) {
    const docRef = this.getDocRef(ref);

    return getDoc(docRef);
  }

  /**
   * This function returns a promise that resolves to an array of documents from the collection group.
   * @returns An array of objects.
   */
  async getAllInterviewSets() {
    const groupQuery = query(this.getCollectionGroupRef());

    return getDocs(groupQuery);
  }
}

export default new InterviewSetsService();
