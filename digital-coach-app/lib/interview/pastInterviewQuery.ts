import { useQuery } from "react-query";
import InterviewQuestionService from "../interviewQuestion/InterviewQuestionService";
import InterviewService from "./InterviewService";

export default function pastInterviewQuery(userId: string | undefined) {
  return useQuery(
    ["fetchUserInterviews"],
    async () => {
      const interviews = await InterviewService.fetchUserInterviews(userId!);
      const interviewLookup = interviews.docs.map(async (interview) => {
        const interviewData =
          await InterviewQuestionService.getInterviewQuestionFromRefPath(
            userId!,
            interview.id
          );
        const interviewQuestions = interviewData.docs;
        const scores = interviewQuestions
          .map((interview) => interview.data().score)
          .filter(
            (score): score is number => score !== undefined && score !== null
          );
        const averageScore =
          scores.reduce((acc, score) => acc + score, 0) / scores.length;
        const completed = interviewQuestions.map(
          (interview) => interview.data().answeredAt !== null
        );
        const completionPct =
          completed.filter((item) => item).length / completed.length;
        return {interviewName: interview.data().title, date: interview.data().createdAt.toDate().toTimeString() ,averageScore, completionPct}
      });
      return Promise.all(interviewLookup);
    },
    {
      enabled: !!userId,
    }
  );
}
