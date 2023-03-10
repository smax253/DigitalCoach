import { Timestamp } from "firebase/firestore";

export type TSubject =
  | "math"
  | "science"
  | "english"
  | "history"
  | "geography"
  | "chemistry"
  | "physics"
  | "Business Accounting and Analytics"
  | "Any";		// For questions not specific to any subject.

export type TQuestionType = 
  | "behaviorial"
  | "technical" 
  | null;

export type TExperienceLevel = 
  | "Entry"
  | "Mid"
  | "Senior"
  | "Any"

export interface IBaseQuestionAttributes {
  subject: TSubject;
  question: string;
  type?: TQuestionType;	// nullable, for now
  experienceLevel: TExperienceLevel;	// nullable
  companies: string[];
  popularity?: number;
  createdBy?: string | null;	// nullable
} 

export interface IBaseQuestion extends IBaseQuestionAttributes {
  lastUpdatedAt: Timestamp;
  createdAt: Timestamp;
}

export interface IQuestion extends IBaseQuestion {
  gid: string;
}
