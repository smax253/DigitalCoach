import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IInterviewSetDocumentReferenceAttributes {
  userId: string;
  interviewSetId: string;
}

export type TInterviewSetDocumentReference =
  | DocumentReference<IInterviewSetAttributes>
  | IInterviewSetDocumentReferenceAttributes;

export interface IBaseInterviewSet {
  name: string;
}

export interface IInterviewSetAttributes extends IBaseInterviewSet {
  minutesToAnswer: number;
  numberOfRetries: number;
}

export interface IInterviewSet extends IInterviewSetAttributes {
  id: string;
}
