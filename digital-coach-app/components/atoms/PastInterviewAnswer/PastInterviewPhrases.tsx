import { RefObject } from "react";
import ReactPlayer from "react-player";
import Card from "../Card";

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
    <Card>
      <h3>Most Common Phrases</h3>
      <ul>
        {keywords.map((keyword) => {
          return (
            <li key={keyword.count}>
              <span>{keyword.text}</span>
              <div>
                {keyword.timestamps.map((timestamp) => {
                  return (
                    <div
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
