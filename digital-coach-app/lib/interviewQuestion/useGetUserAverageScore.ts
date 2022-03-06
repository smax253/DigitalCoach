import { useQuery } from "react-query";
import InterviewQuestionService from "./InterviewQuestionService";


export default function useGetUserAverageScore(userId:string|undefined) {
    return useQuery(["getUserScores"], () =>{
        if(userId){
            return InterviewQuestionService.getUserAverageScore(userId);
        }
        return 0;
    });
}