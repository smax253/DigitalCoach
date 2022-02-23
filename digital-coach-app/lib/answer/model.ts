import { Timestamp } from "firebase/firestore";

export interface IAnswer {
  id: string;
  videoUrl: string;
  duration: number;
  isSubmission: boolean;
  createdAt: Timestamp;
}
