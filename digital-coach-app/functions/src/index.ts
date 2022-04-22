import "./firebase.config";
import * as functions from "firebase-functions";
import {getApp} from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";

import {default as axios} from "axios";
import sampleAPIResponse from "./sampledata";

const app = getApp();

export const answerUpload = functions.firestore.document("users/{userId}/interviews/{interviewId}/interviewQuestions/{questionId}/answers/{answerId}").onCreate(async (snapshot, context) => {
  const data = snapshot.data();

  const videoRefUrl = data.videoUrl;
  const videoRef = ref(getStorage(app), videoRefUrl);
  const videoDownloadUrl = await (await getDownloadURL(videoRef)).toString();
  if (!process.env.ML_API_URL) {
    functions.logger.log("ML_API_URL is not set, using dummy data...");
    snapshot.ref.update({evaluation: sampleAPIResponse});
  } else {
    try {
      const MLApiResponse = await axios.post(process.env.ML_API_URL, {
        videoUrl: videoDownloadUrl,
      } );
      snapshot.ref.update({evaluation: MLApiResponse.data});
    } catch (error) {
      functions.logger.error(error);
    }
  }
});
