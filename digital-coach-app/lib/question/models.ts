import { Timestamp } from "firebase/firestore";

export type TSubject =
  | "math"
  | "science"
  | "english"
  | "history"
  | "geography"
  | "chemistry"
  | "physics"
  | "Business Accounting and Analytics";

export interface IBaseQuestionAttributes {
  subject: TSubject;
  question: string;
}

export interface IBaseQuestion extends IBaseQuestionAttributes {
  lastUpdatedAt: Timestamp;
  createdAt: Timestamp;
}

export interface IQuestion extends IBaseQuestion {
  gid: string;
}
