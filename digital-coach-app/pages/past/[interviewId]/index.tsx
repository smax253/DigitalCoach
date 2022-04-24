import PastInterviewQuestionTable from "@App/components/organisms/PastInterviewQuestionTable";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import useGetInterviewName from "@App/lib/interview/useGetInterviewName";
import { useRouter } from "next/router";

export default function PastInterviewReviewPage() {
    const router = useRouter();
    const {currentUser} = useAuthContext();
    const {interviewId} = router.query;
    const {data: interviewName, isLoading, refetch} = useGetInterviewName(currentUser?.id, interviewId?.toString());
    if(!interviewName && isLoading){
        refetch();
        return <div>Loading...</div>
    }
    return (
        <AuthGuard>
            <h1>{interviewName}</h1>
            {currentUser && interviewId && <PastInterviewQuestionTable userId={currentUser?.id} interviewId={interviewId.toString()} />}
        </AuthGuard>
    );
}