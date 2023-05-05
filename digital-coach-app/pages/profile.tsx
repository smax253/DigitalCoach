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
      setInterviews(result.docs.map((doc) => doc.data()));
	  console.log(result.docs.map((doc) => doc.data()));
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
			{
				Object.keys(interviews).length !== 0 ? (
					<div>
						{
							interviews.filter((interview) => Object.keys(interview.result).length > 0).map((interview) => { 
								return(
									<Card>
										<p>Interview: {interview.title}</p>
										<p>Aggregate Score (0 - 100): {interview.result.aggregateScore}</p>
										<p>Big Five Scores (-10 to 10): </p>
										<ul>
											<li>Openness: {interview.result.bigFive.o}</li>
											<li>Conscientiousness: {interview.result.bigFive.n}</li>
											<li>Extraversion: {interview.result.bigFive.e}</li>
											<li>Agreeableness: {interview.result.bigFive.a}</li>
											<li>Neuroticism: {interview.result.bigFive.n}</li>
										</ul>
									</Card>
								)
							})
						}
					</div>
				) : (
					<p>No previous interviews found.</p>
				)
			}
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
