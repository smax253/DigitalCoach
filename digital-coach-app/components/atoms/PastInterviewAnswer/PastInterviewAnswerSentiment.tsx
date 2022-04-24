import {AudioSentiments} from "@App/lib/answer/model"
import fixCapitalization from "@App/util/fixCapitalization";
import Mic from "@mui/icons-material/Mic";
import Card from "../Card";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  sentiment: AudioSentiments;
}

export default function PastInterviewAnswerSentiment(props: Props){
    return <Card>
      <h3>Most Common Audio Sentiment</h3>
      <div><Mic/>{fixCapitalization(props.sentiment)}</div>
      </Card>
    
}