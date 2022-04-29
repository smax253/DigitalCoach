import { MutableRefObject, RefObject, useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import {AudioSentiments, FacialEmotions} from '../../lib/answer/model';
import MicIcon from '@mui/icons-material/Mic';
import fixCapitalization from '@App/util/fixCapitalization';
import { EmojiEmotions } from '@mui/icons-material';
import Card from '../atoms/Card';
import styles from "@App/components/molecules/PastInterviewAnswerPlayer.module.scss"

interface Props
extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> {
    videoUrl: string;
    timeline: {
        audioSentiment: AudioSentiments;
        end: number;
        facialEmotion: FacialEmotions[];
        start: number;
      }[];
      playerRef: RefObject<ReactPlayer>;
}
const sentimentStyleClass={
    "POSITIVE": styles.positiveSentiment,
    "NEGATIVE": styles.negativeSentiment,
    "NEUTRAL": styles.neutralSentiment 
}
const emotionStyleClass={
  "happy": styles.positiveEmotion,
  "fear": styles.negativeEmotion,
  "surprise": styles.negativeEmotion,
  "sadness": styles.negativeEmotion,
  "neutral": styles.neutralEmotion 
}
export default function PastInterviewAnswerPlayer(props: Props){
  const {videoUrl, timeline, playerRef} = props;
  const [currentSentiment, setCurrentSentiment] = useState<AudioSentiments>(timeline[0].audioSentiment);
  const [currentEmotion, setCurrentEmotion] = useState<FacialEmotions>(timeline[0].facialEmotion[0]);
  const currentStateCallback = useCallback(({playedSeconds} : {playedSeconds: number}) => {
    const currentTimeMillis = playedSeconds * 1000;
    const timelineEntry = timeline.find(entry => entry.start <= currentTimeMillis && entry.end >= currentTimeMillis);
    if (timelineEntry) {
      setCurrentSentiment(timelineEntry.audioSentiment);
      setCurrentEmotion(timelineEntry.facialEmotion[0]);
    }
  },[timeline]);
    return <Card className={styles.card}>
      <div className={styles.video}>
        <ReactPlayer ref={playerRef} url={videoUrl} controls={true} width={'100%'} height={'100%'} onProgress={currentStateCallback}/>
      </div>
      <div className={styles.elem}>
        <Card className={sentimentStyleClass[currentSentiment]}>
          <MicIcon />
          <span>{fixCapitalization(currentSentiment)}</span>
        </Card>
        <Card className={emotionStyleClass[currentEmotion]}>
          <EmojiEmotions />
          <span>{fixCapitalization(currentEmotion)}</span>
        </Card>
      </div>
    </Card>
}