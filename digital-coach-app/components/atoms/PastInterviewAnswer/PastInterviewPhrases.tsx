import { RefObject } from "react";
import ReactPlayer from "react-player";
import Card from "../Card";
import styles from '@App/components/atoms/PastInterviewAnswer/PastInterviewPhrases.module.scss'


interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  keywords: {
    count: number;
    rank: number;
    text: string;
    timestamps: { start: number; end: number }[];
  }[];
  playerRef: RefObject<ReactPlayer>;
}

export default function PastInterviewAnswerPhrases(props: Props) {
  const { keywords, playerRef } = props;
  const seekTo = playerRef.current?.seekTo;
  return (
    <Card className={styles.phrasesList}>
      <h3>Most Common Phrases</h3>
      <ul>
        {keywords.map((keyword) => {
          return (
            <li key={keyword.count} className={styles.phraseRow}>
              <div>{keyword.text}</div>
              <div className={styles.timestamps}>
                {keyword.timestamps.map((timestamp) => {
                  return (
                    <div
                      className={styles.timestampButton}
                      key={timestamp.start}
                      onClick={() => seekTo && seekTo(timestamp.start / 1000)}
                    >
                      {`${Math.floor(timestamp.start / 1000)}-${Math.floor(
                        timestamp.end / 1000
                      )}`}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
