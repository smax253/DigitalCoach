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

const Home: NextPage = () => {
  const { currentUser } = useAuthContext();

  const {
    data: questionSets,
    isLoading,
    isFetching,
  } = useGetFeaturedQuestionSets();

  if (isLoading || isFetching) return <div>Loading...</div>;

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
  const mockEvents = [
    {
      start: "2022-02-10T10:00:00",
      end: "2022-02-10T16:00:00",
    },
    {
      start: "2022-02-14T10:00:00",
      end: "2022-02-14T16:00:00",
    },
    {
      start: "2022-02-16T10:00:00",
      end: "2022-02-16T16:00:00",
    },
    {
      start: "2022-02-20T10:00:00",
      end: "2022-02-20T16:00:00",
    },
  ];

  return (
    <AuthGuard>
      <div className={styles.Home}>
        <h1>Welcome back, {currentUser?.name}!</h1>
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
          <Card multiline>
            <div className={styles.calendarWrapper}>
              <PracticeCalendar events={mockEvents} />
            </div>
          </Card>
          <Card title={"Most Common Flags"} multiline>
            <div className={styles.issuesChartWrapper}>
              <IssuesChart chartData={mockIssuesData} />
            </div>
          </Card>
          <Card title={"Tip of the Day!"} multiline>
            <p>
              Start by researching the company and your interviewer.
              Understanding key information about the company you’re
              interviewing with can help you go into your interview with
              confidence.{" "}
            </p>
          </Card>
          <Card title={"Recent Recordings"} multiline>
            <h4>You have not recorded an interview yet!</h4>
          </Card>

          <Card title={"Average Score"} multiline>
            <div className={styles.scoreChartWrapper}>
              <ScoreChart score={80} />
            </div>
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
