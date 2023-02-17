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
  orderBy,
  updateDoc,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import {
  IBaseQuestion,
  IBaseQuestionAttributes,
  IQuestion,
  TQuestionType,
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
	return await addDoc(this.getCollectionRef(), question);
  }

  /**
   * This function returns a promise that resolves to an array of objects, each of which represents a
   * question.
   * @returns An array of objects.
   */
  async getAllQuestions() {
    return await getDocs(this.getCollectionRef());
  }

  /**
   * It returns a promise that resolves to an array of documents that match the given subject
   * @param {TSubject} subject - TSubject - the subject to filter by
   * @returns An array of documents that match the query.
   */
  async getBySubject(subject: TSubject) {
    const ref = this.getCollectionRef();

    const filter = where("subject", "==", subject);

    return await getDocs(query(ref, filter));
  }

  /**
   * This function returns a promise that resolves to an array of documents that match the given position
   * @param {string} position - string - the position to filter by
   * @returns An array of documents that match the query.
   */
  async getByPosition(position: string) { 
	const ref = this.getCollectionRef();

	const filter = where("position", "==", position);
	
	return await getDocs(query(ref, filter));
  }

  /**
   * This function returns a promise that resolves to an array of documents that match the given company
   * @param {Array<string>} companies - Array<string> - the company to filter by
   * @returns An array of documents that match the query.
   */
  async getByCompany(companies: Array<string>) {
	const ref = this.getCollectionRef();
	
	const filter = where("companies", "array-contains-any", companies);

	return await getDocs(query(ref, filter));
  }

  /**
   * This function returns a promise that resolves to an array of documents that match the given question type
   * @param {string} type - string - the question type to filter by
   * @returns An array of documents that match the query.
   */
  async getByType(type: string) {
	const ref = this.getCollectionRef();

	const filter = where("type", "==", type)

	return await getDocs(query(ref, filter));
  }

  /**
   * This function returns a promise that resolves to an array of question documents
   * sorted by popularity, descending.
   * @returns An array of documents that match the query.
   */
  async getByPopularityDesc() { 
	const ref = this.getCollectionRef();

	const filter = orderBy("popularity", "desc");

	return await getDocs(query(ref, filter));

  }

  async updateQuestion(
	{
		qid, 
		subject,
		question,
		type,
		position,
		companies = [],
		popularity
	}: {
		qid: string,
		subject?: TSubject,
		question?: string,
		type?: TQuestionType,
		position?: string,
		companies?: Array<string>,
		popularity?: number

	})
	 {
	const ref = this.getCollectionRef();
	
	const foundQuestion = (await getDoc(doc(ref, qid))).data();

	if(foundQuestion === undefined) {
		throw new Error("Question not found!");
	}

	// Note: This returns undefined; it does not return the updated document.
	let res = await setDoc(
		doc(ref, qid),
		{
			...foundQuestion,
			subject: subject || foundQuestion.subject,
			question: question || foundQuestion.question,
			type: type || foundQuestion.type || null,
			position: position || foundQuestion.position || "",
			companies: companies.length > 0 ? companies : foundQuestion.companies,
			popularity: popularity || foundQuestion.popularity || 0,
			lastUpdatedAt: Timestamp.now()
		},
		{ merge: true } 
		
	)
	.then(function() { 
		return getDoc(doc(ref, qid));	// This returns the updated document. (I think.
	})
	.catch((e) => { throw new Error("Error updating question: ", e) });

	return res;
  }
}

export default new QuestionService();
