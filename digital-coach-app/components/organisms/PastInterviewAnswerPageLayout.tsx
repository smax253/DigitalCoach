import useGetSubmission from "@App/lib/answer/useGetSubmission";
import { PropsWithoutRef, useRef } from "react";
import ReactPlayer from "react-player";
import PastInterviewAnswerExpression from "../atoms/PastInterviewAnswer/PastInterviewAnswerExpression";
import PastInterviewAnswerSentiment from "../atoms/PastInterviewAnswer/PastInterviewAnswerSentiment";
import PastInterviewAnswerTitle from "../atoms/PastInterviewAnswer/PastInterviewAnswerTitle";
import PastInterviewAnswerPhrases from "../atoms/PastInterviewAnswer/PastInterviewPhrases";
import PastInterviewAnswerPlayer from "../molecules/PastInterviewAnswerPlayer";
import styles from "@App/components/organisms/PastInterviewAnswerPage.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  userId: string;
  interviewId: string;
  answerId: string;
}

export default function PastInterviewAnswerPageLayout(props: Props) {
  const { userId, answerId, interviewId } = props;
  const { data, isLoading, refetch, isFetching, isError } = useGetSubmission(
    userId,
    interviewId,
    answerId
  );
  const playerRef = useRef<ReactPlayer>(null);
  if (!data || isLoading) {
    //if (!isFetching && !isError) refetch();
    return <div>Loading...</div>;
  }

  return (
    <div className = {styles.pad}>
    <>
      <PastInterviewAnswerTitle
        interviewName={data.interviewName}
        questionName={data.questionName}
      />
      {data?.evaluation ? (
        <>
          <PastInterviewAnswerPlayer
            videoUrl={data.videoUrl}
            timeline={data.evaluation.timeline}
            playerRef={playerRef}
          />
          <div>
              <PastInterviewAnswerExpression emotion={data.evaluation.overallFacialEmotion} />
              <PastInterviewAnswerSentiment sentiment={data.evaluation.overallSentiment} />
          </div>
          <PastInterviewAnswerPhrases playerRef={playerRef} keywords={data.evaluation.topFiveKeywords} />
        </>
      ) : (
        <h3>This interview has not yet been processed. Check back later.</h3>
      )}
    </>
    </div>
  );
}
