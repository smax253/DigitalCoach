import Link from "next/link";
import Avatar from "@App/components/atoms/Avatar";
import Card from "@App/components/atoms/Card";
import Grid from "@mui/material/Grid";
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
            <Grid className={styles.ProgressPage_body} container alignItems="center" justifyContent="center">
                <Card className={styles.ProgressPage_bodyCard} title="Followup Interview">{currentUser?.data()?.email}</Card>
                <Card title="Big Five Score">
                  Current Score: xyz<br></br>
                  Target Score: abc<br></br>
                </Card>
                <Card title="How to Improve">
                  1) .....<br></br>
                  2) .....<br></br>
                </Card>
                <Card title="Graph of User's Score Progress"></Card>
            </Grid>
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
  const { currentUser } = useAuthContext();
  let hasInterviewed = currentUser?.get("hasCompletedInterview")
  console.log(hasInterviewed);
  //Add flag to user that says if they've completed an interview or not
  if(hasInterviewed){
    return (
      <AuthGuard>
        <ProgressPage/>
      </AuthGuard>
    )
  }else{
    return (
      <AuthGuard>
        <ProgressInit/>
      </AuthGuard>
    );
  }
}
