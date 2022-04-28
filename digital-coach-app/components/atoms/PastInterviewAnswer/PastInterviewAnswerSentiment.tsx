import {AudioSentiments} from "@App/lib/answer/model"
import fixCapitalization from "@App/util/fixCapitalization";
import Mic from "@mui/icons-material/Mic";
import Card from "../Card";
import styles from "@App/components/molecules/PastInterviewAnswerPlayer.module.scss"

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  sentiment: AudioSentiments;
}
const sentimentStyleClass={
  "POSITIVE": styles.positiveSentiment,
  "NEGATIVE": styles.negativeSentiment,
  "NEUTRAL": styles.neutralSentiment 
}

export default function PastInterviewAnswerSentiment(props: Props){
    return <Card className={sentimentStyleClass[props.sentiment]}>
      <h3>Most Common Audio Sentiment</h3>
      <div><Mic/>{fixCapitalization(props.sentiment)}</div>
      </Card>
    
}