import Link from "next/link";
import Avatar from "@App/components/atoms/Avatar";
import Card from "@App/components/atoms/Card";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthService from "@App/lib/auth/AuthService";
import AuthGuard from "@App/lib/auth/AuthGuard";
import InterviewService from "@App/lib/interview/InterviewService";
import UserService from "@App/lib/user/UserService";
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
  //Store user's id here
  useAuthContext();
  let thisUserId = UserService.getUserId();
  console.log(thisUserId);
  //Need to await results, but can't await in default function of react elem
  //const usersInterviews = InterviewService.fetchUserInterviews(thisUserId!);
  //console.log(usersInterviews);
  //if(usersInterviews){}
  return (
    <AuthGuard>
      <ProgressInit/>
    </AuthGuard>
  );
}
