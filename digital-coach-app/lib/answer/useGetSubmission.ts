import { useQuery } from "react-query";
import InterviewService from "../interview/InterviewService";
import InterviewQuestionService from "../interviewQuestion/InterviewQuestionService";
import StorageService from "../storage/StorageService";
import AnswerService from "./AnswerService";

export default function useGetSubmission(userId: string, interviewId: string, questionId: string) {
  return useQuery(
    ["getSubmission"],
    async () => {
      console.log(userId, interviewId, questionId);
        const interview = await InterviewService.fetchInterview({userId, interviewId});
        const interviewData = interview.data();
        const question = await InterviewQuestionService.getInterviewQuestion(userId, interviewId, questionId);
        const questionData = question.data();
        const submission = await AnswerService.getSubmission(question.ref);
        if(!interviewData || !questionData || !submission) return null;
        const downloadVideoUrl = await StorageService.getDownloadUrlFromVideoUrlRef(submission.data().videoUrl);
        return {interviewName: interviewData.title, questionName: questionData.question, videoUrl: downloadVideoUrl, evaluation: submission.data().evaluation};
    },
    {
      enabled: !!userId && !!interviewId && !!questionId,
    }
  );
}
