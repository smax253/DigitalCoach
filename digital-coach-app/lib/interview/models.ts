import { Timestamp } from "firebase/firestore";
import { IQuestion } from "@App/lib/question/models";
import { IAnswer } from "../answer/model";

export interface IBaseInterview {
  title: string;
}

export interface IInterviewAttributes extends IBaseInterview {
  completedAt: Timestamp | null;
  reviewedAt: Timestamp | null;
  createdAt: Timestamp;
}

export interface IInterview extends IInterviewAttributes {
  id: string;
}
