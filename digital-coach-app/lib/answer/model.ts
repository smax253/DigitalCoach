import { Timestamp } from "firebase/firestore";
import { StorageReference } from "firebase/storage";

export type FacialEmotions = "happy" | "sadness" | "neutral" | "surprise" | "fear";
export type AudioSentiments = "NEUTRAL" | "POSITIVE" | "NEGATIVE";
export interface IAnswerEvalAttributes {
  aggregateScore: number;
  facialStatistics: {
    frequencyOfSecondEmotion: number;
    frequencyOfThirdEmotion: number;
    frequencyOfTopEmotion: number;
    topThreeEmotions: FacialEmotions[];
  };
  isStructured: number;
  isStructuredPercent: number;
  overallFacialEmotion: FacialEmotions;
  overallSentiment: AudioSentiments;
  timeline: {
    audioSentiment: AudioSentiments;
    end: number;
    facialEmotion: FacialEmotions[];
    start: number;
  }[];
  topFiveKeywords: {
    count: number;
    rank: number;
    text: string;
    timestamps:{start:number, end:number}[];
  }[];
}

export interface IAnswerAttributes {
  videoUrl: StorageReference | string;
  isSubmission: boolean;
  evaluation?: IAnswerEvalAttributes;
  userId: string;
}

export interface IAnswer extends IAnswerAttributes {
  createdAt: Timestamp;
}
