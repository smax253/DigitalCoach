import type { NextPage } from "next";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import styles from "@App/styles/Home.module.scss";
import Card from "@App/components/atoms/Card";
import IssuesChart from "@App/components/molecules/IssuesChart";
import ScoreChart from "@App/components/molecules/ScoreChart";
import PracticeCalendar from "@App/components/molecules/PracticeCalendar";
import useGetFeaturedQuestionSets from "@App/lib/questionSets/useGetFeaturedQuestionSets";
import Link from "next/link";
import useGetUserAverageScore from "@App/lib/interviewQuestion/useGetUserAverageScore";
import useFetchUserInterviews from "@App/lib/interview/useFetchUserInterviews";
import useGetAnswersByUserId from "@App/lib/answer/useGetAnswerByUserId";

const Home: NextPage = () => {
  const { currentUser } = useAuthContext();

  const {
    data: questionSets,
    isLoading,
    isFetching,
  } = useGetFeaturedQuestionSets();
  const {
    data: answerData,
    isLoading: isAnswerLoading,
    isFetching: isAnswerFetching,
  } = useGetAnswersByUserId(currentUser?.id);

  const {
    data: averageScore,
    isLoading: isLoadingAverageScore,
    isFetching: isFetchingAverageScore,
  } = useGetUserAverageScore(currentUser?.id);

  if (
    averageScore === undefined ||
    isLoadingAverageScore ||
    isAnswerLoading ||
    isLoading ||
    isFetching
  )
    return <div>Loading...</div>;

  const mockIssuesData = [
    {
      skill: "No Eye Contact",
      value: 0.9,
    },
    {
      skill: "Filler Word",
      value: 0.75,
    },
    {
      skill: "Long Pause",
      value: 0.65,
    },
    {
      skill: "Voice Not Clear",
      value: 0.6,
    },
    {
      skill: "Off Topic",
      value: 0.4,
    },
  ];
  const events =
    answerData?.docs.map((answer) => {
      return {
        start: answer.data().createdAt.toDate().toISOString(),
        end: answer.data().createdAt.toDate().toISOString(),
      };
    }) || [];

  return (
    <AuthGuard>
      <div className={styles.Home}>
        <h1>Welcome back, {currentUser?.data()?.name}!</h1>
        <h2>Dashboard</h2>
        <div className={styles.cards}>
          <Card title={"Quick Start Interviews"} multiline>
            <ul>
              {questionSets?.docs.map((questionSet) => (
                <li key={questionSet.id}>
                  <Link href="/">{questionSet.data().title}</Link>
                  <span>→</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title={"Tip of the Day!"} multiline>
          <div className={styles.tipoftheday}>
            <p>
              Start by researching the company and your interviewer.
              Understanding key information about the company you’re
              interviewing with can help you go into your interview with
              confidence.
            </p>
            </div>
          </Card>
          <Card title={"Recent Recordings"} multiline>
            <h4>You have not recorded an interview yet!</h4>
          </Card>
          <Card multiline>
            <div className={styles.calendarWrapper}>
              <PracticeCalendar events={events} />
            </div>
          </Card>
          <Card title={"Most Common Flags"} multiline>
            <div className={styles.issuesChartWrapper}>
              <IssuesChart chartData={mockIssuesData} />
            </div>
            <h2>Average Score: {Math.round(averageScore * 100)}%</h2>
          </Card>
        </div>

        {/*
        <span>id: {currentUser?.id}</span>
        <span>email: {currentUser?.email}</span>
        <span>name: {currentUser?.name}</span>
        <span>concentration: {currentUser?.concentration}</span>
        <span>proficiency: {currentUser?.proficiency}</span>*/}
      </div>
    </AuthGuard>
  );
};

export default Home;
