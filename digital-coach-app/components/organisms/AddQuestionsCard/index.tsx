import Card from '@App/components/atoms/Card';
//import { TextField } from "@App/components/molecules/TextField";
import BrowseQuestionsList from './BrowseQuestionsList';
import SelectedQuestionsList from './SelectedQuestionsList';
import styles from './AddQuestionsCard.module.scss';
import { MenuItem, Button, FormControl, TextField } from '@mui/material';

const sampleSubjects = [
  'Business Accounting and Analytics',
  'Business Management',
  'Business Marketing',
  'Business Operations',
  'Business Strategy',
  'Business Technology',
  'Data Science',
  'Finance',
  'Human Resources',
  'Information Technology',
  'Law',
];

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
            <br />{' '}
            <TextField
              id='subject-select'
              label='Subject'
              required
              select
              // onChange={(event) => setSubjectSelect(event.target.value)}
            >
              {sampleSubjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </TextField>
            <TextField
              id='jobPosition'
              label='Experience level'
              required
              select>
              <MenuItem value='Any'>Any Level</MenuItem>
              <MenuItem value='Entry'>Entry Level</MenuItem>
              <MenuItem value='Mid'>Mid Career</MenuItem>
              <MenuItem value='Senior'>Senior Level</MenuItem>
            </TextField>
            <br />
            <br />
            <TextField id='questionType' label='Question Type' required select>
              <MenuItem value='behavioral'>Behavioral</MenuItem>
              <MenuItem value='technical'>Technical</MenuItem>
            </TextField>
            <br />
            <TextField
              id='company'
              label='Company'
              placeholder='Enter the company who asked the question'
              helperText='Optional'
            />
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
