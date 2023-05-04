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
      console.log(result.docs);
      setInterviews(result.docs);
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
                {interviews.map((interview: any) => {
                  if (
                    Object.keys(
                      interview._document.data.value.mapValue.fields.result
                        .mapValue
                    ).length !== 0
                  ) {
                    return (
                      <div key={interview.id}>
                        <h4>
                          Interview Name:{' '}
                          {
                            interview._document.data.value.mapValue.fields.title
                              .stringValue
                          }
                        </h4>
                        <p>
                          Time:{' '}
                          {
                            interview._document.data.value.mapValue.fields
                              .createdAt.timestampValue
                          }
                        </p>
                        <p>
                          Score:{' '}
                          {
                            interview._document.data.value.mapValue.fields
                              .result.mapValue.fields.aggregateScore.doubleValue
                          }
                        </p>
                      </div>
                    );
                  }
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
