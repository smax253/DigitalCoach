import {FacialEmotions} from "@App/lib/answer/model"
import fixCapitalization from "@App/util/fixCapitalization";
import { EmojiEmotions } from "@mui/icons-material";
import Card from "../Card";
import styles from "@App/components/molecules/PastInterviewAnswerPlayer.module.scss"

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  emotion: FacialEmotions;
}
const emotionStyleClass={
  "happiness": styles.positiveEmotion,
  "fear": styles.negativeEmotion,
  "surprise": styles.negativeEmotion,
  "sadness": styles.negativeEmotion,
  "neutral": styles.neutralEmotion 
}
export default function PastInterviewAnswerExpression(props: Props){
    return <Card className={emotionStyleClass[props.emotion]}>
      <h3>Most Common Facial Expression</h3>
      <div><EmojiEmotions/>{fixCapitalization(props.emotion)}</div>
      </Card>
}