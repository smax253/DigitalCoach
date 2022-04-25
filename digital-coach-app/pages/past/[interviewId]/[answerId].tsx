import PastInterviewAnswerPageLayout from "@App/components/organisms/PastInterviewAnswerPageLayout";
import useAuthContext from "@App/lib/auth/AuthContext";
import { useRouter } from "next/router";


export default function PastInterviewAnswerPage() {
    const router = useRouter();
    const {currentUser} = useAuthContext();
    const {interviewId, answerId} = router.query;
    const interviewIdString = interviewId?.toString();
    const answerIdString = answerId?.toString();
    return (
        <div>
            {currentUser?.id && <PastInterviewAnswerPageLayout userId={currentUser.id} interviewId={interviewIdString!} answerId={answerIdString!} />}
        </div>
    );
}