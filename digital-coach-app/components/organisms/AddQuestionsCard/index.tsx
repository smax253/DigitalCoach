import Card from "@App/components/atoms/Card";
import { TextField } from "@App/components/molecules/TextField";
import BrowseQuestionsList from "./BrowseQuestionsList";
import SelectedQuestionsList from "./SelectedQuestionsList";
import styles from "./AddQuestionsCard.module.scss";

export default function AddQuestionsCard() {
  return (
    <Card title="Add Questions">
      <div className={styles.AddQuestionsCard}>
        <div className={styles.AddQuestionsCard_browseList}>
          <TextField title="Enter Custom Question" />
          <BrowseQuestionsList />
        </div>

        <div className={styles.AddQuestionsCard_questionList}>
          <SelectedQuestionsList />
        </div>
      </div>
    </Card>
  );
}
