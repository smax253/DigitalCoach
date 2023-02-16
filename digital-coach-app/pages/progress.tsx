import Link from "next/link";
import Avatar from "@App/components/atoms/Avatar";
import Card from "@App/components/atoms/Card";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";

import styles from "@App/styles/ProgressPage.module.scss";

function ProgressPage(){
    const { currentUser } = useAuthContext();
    //Use grids instead of lists of cards
    return (
        <div className={styles.ProgressPage}>
          <h1>Your Progress</h1>
    
          <div className={styles.ProgressPage_avatarWrapper}>
                {currentUser?.data()?.avatarUrl && (
                <Avatar size={125} src={currentUser?.data()!.avatarUrl} />
                )}
          </div>
    
          <div className={styles.ProgressPage_body}>
            <div className={styles.ProgressPage_bodyLeft}>
                <Card title="Initial Interview">
                    <Link href="/start">
                        <a className={styles.linksText}>Start an Interview</a>
                    </Link>
                </Card>
                <Card title="Followup Interview">{currentUser?.data()?.email}</Card>
            </div>
    
            <div className={styles.ProgressPage_bodyRight}>
              <Card title="Major">{currentUser?.data()?.concentration}</Card>
              <Card title="Big Five Score">
                Current Score: xyz<br></br>
                Target Score: abc<br></br>
              </Card>
            </div>
          </div>
        </div>
      );
}

function ProgressInit(){
  const { currentUser } = useAuthContext();
  return (
      <div className={styles.ProgressPage}>
          <h1>Your Progress</h1>
    
          <div className={styles.ProgressPage_avatarWrapper}>
                {currentUser?.data()?.avatarUrl && (
                <Avatar size={125} src={currentUser?.data()!.avatarUrl} />
                )}
          </div>
    
          <div className={styles.ProgressPage_body}>
            <div className={styles.ProgressPage_bodyLeft}>
                <Card title="Initial Interview">
                    <Link href="/start">
                        <a className={styles.linksText}>Start an Interview</a>
                    </Link>
                </Card>
            </div>
          </div>
        </div>
  )
}

export default function Progress() {
    return (
      <AuthGuard>
        <ProgressInit/>
      </AuthGuard>
    );
  }