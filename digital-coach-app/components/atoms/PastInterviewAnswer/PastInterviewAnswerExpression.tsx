import {FacialEmotions} from "@App/lib/answer/model"
import fixCapitalization from "@App/util/fixCapitalization";
import { EmojiEmotions } from "@mui/icons-material";
import Card from "../Card";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  emotion: FacialEmotions;
}

export default function PastInterviewAnswerExpression(props: Props){
    return <Card>
      <h3>Most Common Facial Expression</h3>
      <div><EmojiEmotions/>{fixCapitalization(props.emotion)}</div>
      </Card>
}