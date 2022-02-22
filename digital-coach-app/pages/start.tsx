import Card from "@App/components/atoms/Card";
import AddQuestionsCard from "@App/components/organisms/AddQuestionsCard";
import BasicInfoCard from "@App/components/organisms/BasicInfoCard";
import AuthGuard from "@App/lib/auth/AuthGuard";

import styles from "@App/styles/start.module.scss";

export default function StartInterviewPage() {
  return (
    <AuthGuard>
      <h1>Create Custom Interview Set</h1>
      <div className={styles.StartInterviewPage}>
        <BasicInfoCard />
        <AddQuestionsCard />
      </div>
    </AuthGuard>
  );
}
