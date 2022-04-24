import { MutableRefObject, RefObject, useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import {AudioSentiments, FacialEmotions} from '../../lib/answer/model';
import MicIcon from '@mui/icons-material/Mic';
import fixCapitalization from '@App/util/fixCapitalization';
import { EmojiEmotions } from '@mui/icons-material';
import Card from '../atoms/Card';
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
    return <Card>
      <ReactPlayer ref={playerRef} url={videoUrl} controls={true} width={'100%'} height={'100%'} onProgress={currentStateCallback}/>
      <div>
        <Card>
          <MicIcon />
          <span>{fixCapitalization(currentSentiment)}</span>
        </Card>
        <Card>
          <EmojiEmotions />
          <span>{fixCapitalization(currentEmotion)}</span>
        </Card>
      </div>
    </Card>
}