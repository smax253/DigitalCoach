import Card from "@App/components/atoms/Card";
import { TextField } from "@App/components/molecules/TextField";
import BrowseQuestionsList from "./BrowseQuestionsList";
import SelectedQuestionsList from "./SelectedQuestionsList";
import styles from "./AddQuestionsCard.module.scss";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function AddQuestionsCard() {
  return (
    <Card title="Add Questions">
      <div className={styles.AddQuestionsCard}>
        <div className={styles.AddQuestionsCard_browseList}>
          <FormControl fullWidth>
            <TextField title="Question Text" placeholder=' Enter Custom Question text'/><br/>
            <TextField title="Industry/Field of Work" placeholder=' Enter the industry or field for the question'/><br/>
            <TextField title="Job Position/Level" placeholder=' Enter the position or level the interview question was for'/><br/>
            <TextField title="Company" placeholder=' Enter the company the question was administered by'/><br/>
            <TextField title="Question Type"/><br/>
            {/* <InputLabel id="question-sel-label">Question Type</InputLabel> */}
            <Select labelId="question-sel-label" id='question-sel' label='Question Type'>
              <MenuItem value={'behavioral'}>Behavioral</MenuItem> 
              <MenuItem value={'technical'}>Technical</MenuItem>
            </Select>
            <BrowseQuestionsList />
          </FormControl>
        </div>

        <div className={styles.AddQuestionsCard_questionList}>
          <SelectedQuestionsList />
        </div>
      </div>
    </Card>
  );
}
