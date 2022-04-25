import { useQuery } from "react-query";
import InterviewService from "./InterviewService";

export default function useGetInterviewName(userId: string | undefined | null, interviewId: string | undefined | null) {
    return useQuery(["getInterviewName"], async () => {
        if(userId && interviewId) {
            const interview = await InterviewService.fetchInterview({userId, interviewId});
            return interview?.data()?.title;
        }
        else return null;
    })
}

