import { Timestamp } from "firebase/firestore";
import { IAnswer } from "../answer/model";
import { IQuestion } from "../question/models";

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
