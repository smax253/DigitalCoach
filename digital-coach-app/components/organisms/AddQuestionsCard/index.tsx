import Card from '@App/components/atoms/Card';
//import { TextField } from "@App/components/molecules/TextField";
import BrowseQuestionsList from './BrowseQuestionsList';
import SelectedQuestionsList from './SelectedQuestionsList';
import styles from './AddQuestionsCard.module.scss';
import { MenuItem, Button, FormControl, TextField } from '@mui/material';

export default function AddQuestionsCard() {
  const handleSubmit = () => {
    console.log('Called handleSubmit');
    return;
  };

  return (
    <Card title='Add Questions'>
      <div className={styles.AddQuestionsCard}>
        <form
          className={styles.AddQuestionsCard_browseList}
          onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              id='questionText'
              label='Question Text'
              placeholder='Enter Custom Question text'
              required
            />
            <br />
            <TextField
              id='industry'
              label='Industry/Field of Work'
              placeholder='Enter the industry or field for the question'
              required
            />
            <br />
            <TextField
              id='jobPosition'
              label='Experience level'
              select
              defaultValue={'Any'}>
              <MenuItem value='Entry'>Entry Level</MenuItem>
              <MenuItem value='Mid'>Mid Career</MenuItem>
              <MenuItem value='Senior'>Senior Level</MenuItem>
              <MenuItem value='Any'>Any Level</MenuItem>
            </TextField>
            <br />
            <TextField
              id='company'
              label='Company'
              placeholder='Enter the company the question was administered by'
            />
            <br />
            <TextField id='questionType' label='Question Type' select>
              <MenuItem value='behavioral'>Behavioral</MenuItem>
              <MenuItem value='technical'>Technical</MenuItem>
            </TextField>
            <br />
            <Button variant='contained' sx={{ maxWidth: '50%' }} type='submit'>
              Add Question
            </Button>
          </FormControl>
          <br />

          <BrowseQuestionsList />
        </form>

        <div className={styles.AddQuestionsCard_questionList}>
          <SelectedQuestionsList />
        </div>
      </div>
    </Card>
  );
}
