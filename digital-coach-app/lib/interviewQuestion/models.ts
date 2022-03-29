import { Timestamp } from "firebase/firestore";
import { IQuestion } from "@App/lib/question/models";

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
