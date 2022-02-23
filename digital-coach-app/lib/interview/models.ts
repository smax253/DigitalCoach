import { Timestamp } from "firebase/firestore";
import { IQuestion } from "@App/lib/question/models";

export interface IAnswer {
  videoUrl: string;
  duration: number;
  isSubmission: boolean;
  createdAt: Timestamp;
}

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
  answers: IAnswer[];
  answeredAt: Timestamp | null;
}

export interface IBaseInterview {
  title: string;
}

export interface IInterviewAttributes extends IBaseInterview {
  questions: IInterviewQuestion[];
  completedAt: Timestamp | null;
  reviewedAt: Timestamp | null;
  createdAt: Timestamp;
}

export interface IInterview extends IInterviewAttributes {
  id: string;
}
