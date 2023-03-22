import Card from '@App/components/atoms/Card';
import AddQuestionsCard from '@App/components/organisms/AddQuestionsCard';
import BasicInfoCard from '@App/components/organisms/BasicInfoCard';
import useAuthContext from '@App/lib/auth/AuthContext';
import AuthGuard from '@App/lib/auth/AuthGuard';

import styles from '@App/styles/StartCustomInterviewPage.module.scss';

export default function StartCustomInterviewPage() {
  const { currentUser } = useAuthContext();
  const thisUserId = currentUser?.id;
  const userInfo = { userId: thisUserId };
  //Ignore the error, the code works
  return (
    <AuthGuard>
      <h1>Create Custom Interview Set</h1>
      <div className={styles.StartCustomInterviewPage}>
        <BasicInfoCard {...userInfo} />
        <AddQuestionsCard />
      </div>
    </AuthGuard>
  );
}
