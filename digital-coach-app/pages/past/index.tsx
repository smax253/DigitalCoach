import PastInterviewTable from "@App/components/molecules/PastInterviewTable";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";

export default function PastInterviewPage() {
  const {currentUser} = useAuthContext();
  return (
    <AuthGuard>
      <h1>Past Interviews</h1>
      {currentUser && <PastInterviewTable userId={currentUser.id}/>}
    </AuthGuard>
  );
}
