import { useQuery } from "react-query";
import AnswerService from "../answer/AnswerService";
import InterviewQuestionService from "./InterviewQuestionService";
import {ref, getStorage} from 'firebase/storage'
import StorageService from "../storage/StorageService";



export default function useGetInterviewQuestionsTableData(userId:string|undefined, interviewId: string|undefined) {
    return useQuery(["getQuestionsTable"], async () => {
        if(userId && interviewId){
            const questions = await InterviewQuestionService.getInterviewQuestions({userId, interviewId});
            const questionsData = questions.docs.map(async question => {
                const data = question.data();
                const answers = await AnswerService.getAnswers(question.ref);
                const submission = answers.docs.find(answer => answer.data().isSubmission);
                let videoDownloadUrl = undefined;
                if(submission?.data().videoUrl){
                    videoDownloadUrl = await StorageService.getDownloadUrlFromVideoUrlRef(submission.data().videoUrl);
                }
                return {
                    answerId: submission?.id,
                    questionName: data.question,
                    videoUrl: videoDownloadUrl,
                    score: data.score,
                }
            });
            return Promise.all(questionsData);
        }
        return [];
    });
}