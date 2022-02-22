import Card from "@App/components/atoms/Card";
import AuthGuard from "@App/lib/auth/AuthGuard";
import Link from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import styles from "@App/styles/StartInterviewPage.module.scss";

const RightArrow = () => (
  <ArrowForwardRoundedIcon className={styles.StartInterviewPage_icon} />
);

export default function StartInterviewPage() {
  return (
    <AuthGuard>
      <div className={styles.StartInterviewPage}>
        <div className={styles.StartInterviewPage_leftWrapper}>
          <h1>Start New Interview</h1>

          <Card
            title="Customized Interview"
            className={styles.StartInterviewPage_customIntCard}
          >
            <Link href="/start/custom" passHref>
              <div className={styles.StartInterviewPage_link}>
                <span>Create new custom interview set</span> <RightArrow />
              </div>
            </Link>

            <span>
              <div className={styles.StartInterviewPage_link}>
                <span>View past custom interview sets</span>
                <RightArrow />
              </div>
            </span>
          </Card>

          <Card title="Premade Interview">
            <div className={styles.StartInterviewPage_link}>
              <span>Browse premade interview sets </span>
              <RightArrow />
            </div>
          </Card>
        </div>

        <div className={styles.StartInterviewPage_rightWrapper}>
          <h1>Resume Interview</h1>

          <Card>
            <span>TODO - Resume Interview Table</span>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
