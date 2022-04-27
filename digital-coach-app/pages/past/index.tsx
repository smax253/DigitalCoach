import PastInterviewTable from "@App/components/molecules/PastInterviewTable";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";

import styles from "@App/styles/PastInterviewPage.module.scss";

export default function PastInterviewPage() {
  const {currentUser} = useAuthContext();
  return (
    <AuthGuard>
      <div className={styles.pastBox}>
        <h1>Past Interviews</h1>
        {currentUser && <PastInterviewTable userId={currentUser.id}/>}
      </div>
    </AuthGuard>
  );
}
