import Card from "../Card";
import styles from "./PastInterviewAnswerTitle.module.scss";
interface Props
extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> {
    interviewName: string;
    questionName: string;
}

export default function PastInterviewAnswerTitle(props: Props) {
    const { interviewName, questionName } = props;
    return(
        <Card className={styles.AnswerTitle}>
            <h1>{interviewName}</h1>
            <h4>{questionName}</h4>
        </Card>
    )
}