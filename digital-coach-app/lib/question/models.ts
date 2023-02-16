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

export type TQuestionType = 
  | "behaviorial"
  | "technical" 
  | null;

export interface IBaseQuestionAttributes {
  subject: TSubject;
  question: string;
  type?: TQuestionType;	// nullable, for now
  position?: string;	// nullable
  companies: string[];
  popularity: number;
  createdBy?: string;	// nullable
} 

export interface IBaseQuestion extends IBaseQuestionAttributes {
  lastUpdatedAt: Timestamp;
  createdAt: Timestamp;
}

export interface IQuestion extends IBaseQuestion {
  gid: string;
}
