import { useQuery } from "react-query";
import InterviewService from "./InterviewService";

export default function useFetchUserInterviews(userId: string | undefined) {
    return useQuery(["fetchUserInterviews"], () => {
        if(userId) return InterviewService.fetchUserInterviews(userId);
        else return null;
    })
} //wrote this by accident but we'll prob need it later
