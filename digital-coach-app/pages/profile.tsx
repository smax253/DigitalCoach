import React, { useState, useEffect } from 'react';
import Avatar from '@App/components/atoms/Avatar';
import Card from '@App/components/atoms/Card';
import useAuthContext from '@App/lib/auth/AuthContext';
import AuthGuard from '@App/lib/auth/AuthGuard';
import InterviewService from '@App/lib/interview/InterviewService';

import styles from '@App/styles/ProfilePage.module.scss';

function ProfilePage() {
  const { currentUser } = useAuthContext();
  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    const getInterviews = async () => {
      const result = await InterviewService.fetchUserInterviews(
        currentUser!.id
      );
      console.log(result);
      // setInterviews(result);
    };
    getInterviews();
  }, []);

  return (
    <div className={styles.ProfilePage}>
      <h1>Your Profile</h1>

      <div className={styles.ProfilePage_avatarWrapper}>
        {currentUser?.data()?.avatarUrl && (
          <Avatar size={125} src={currentUser?.data()!.avatarUrl} />
        )}
      </div>

      <div className={styles.ProfilePage_body}>
        <div className={styles.ProfilePage_bodyLeft}>
          <Card title='Name'>{currentUser?.data()?.name}</Card>
          <Card title='Email'>{currentUser?.data()?.email}</Card>
        </div>

        <div className={styles.ProfilePage_bodyRight}>
          <Card title='Major'>{currentUser?.data()?.concentration}</Card>
          <Card title='Experience Level'>
            {currentUser?.data()?.proficiency}
          </Card>
          <Card title='Previous Interview Scores'>
            Display user interviews here
            {interviews.length !== 0 ? (
              <ul>
                <p>Interviews exist</p>
                {interviews.map((interview: any) => {
                  return <p>{interview.result}</p>;
                })}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  );
}
