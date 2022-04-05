import { DocumentReference, Timestamp } from "firebase/firestore";
import { IQuestion } from "@App/lib/question/models";

interface IInterviewQuestionDocumentReferenceAttributes {
  userId: string;
  interviewId: string;
  questionId: string;
}

export type TInterviewQuestionDocumentReference =
  | DocumentReference<IInterviewQuestion>
  | IInterviewQuestionDocumentReferenceAttributes;

export interface IBaseInterviewQuestionAttributes {
  timeLimit: number;
  retries: number;
}
export interface IBaseInterviewQuestion
  extends IQuestion,
    IBaseInterviewQuestionAttributes {}

export interface IInterviewQuestion extends IBaseInterviewQuestion {
  review: null;
  score: number | null;
  answeredAt: Timestamp | null;
}
