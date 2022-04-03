import { useQuery } from "react-query";
import InterviewQuestionService from "../interviewQuestion/InterviewQuestionService";
import InterviewService from "./InterviewService";

export default function useResumeInterviewQuery(userId: string | undefined) {
  return useQuery(
    ["resumeUserInterviews"],
    async () => {
      const interviews = await InterviewService.fetchUserInterviews(userId!);
      const interviewLookup = interviews.docs.map(async (interview) => {
        const interviewData =
          await InterviewQuestionService.getInterviewQuestionFromRefPath(
            userId!,
            interview.id
          );
        const interviewQuestions = interviewData.docs;
       

        const completed = interviewQuestions.map(
          (interview) => interview.data().answeredAt !== null
        );
        const completionPct =
          completed.filter((item) => item).length / completed.length;
        if (completionPct === 1) {
          return null;
        }
        return {
          interviewId: interview.id,
          interviewName: interview.data().title,
          date: interview.data().createdAt.toDate(),
          completionPct,
        };
      });
      const incompleteInterviews = (await Promise.all(interviewLookup)).filter(
        (
          item
        ): item is {
          interviewId: string;
          interviewName: string;
          date: Date;
          completionPct: number;
        } => item !== null || item !== undefined
      );
      return incompleteInterviews;
    },
    {
      enabled: !!userId,
    }
  );
}
