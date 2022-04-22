import useAuthContext from "@App/lib/auth/AuthContext";
import { useRouter } from "next/router";


export default function PastInterviewAnswerPage() {
    const router = useRouter();
    const {currentUser} = useAuthContext();
    const {interviewId, answerId} = router.query;

    return (
        <div>
            <h1>PastInterviewAnswerPage</h1>
            <h2>Interview Id {interviewId}</h2>
            <h3>Answer Id {answerId}</h3>
        </div>
    );
}