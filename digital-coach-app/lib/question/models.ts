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
  | "Any";

export type TExperienceLevel = 
  | "Entry"
  | "Mid"
  | "Senior"
  | "Any"

export interface IBaseQuestionAttributes {
  subject: TSubject;
  question: string;
  type: TQuestionType;
  experienceLevel: TExperienceLevel;
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
