import React from 'react';
import styles from './AddQuestionsCard.module.scss';
import { MenuItem, Button, FormControl, TextField } from '@mui/material';
import QuestionSetsService from '@App/lib/questionSets/QuestionSetsService';

interface propsInfo {
  selectedSet: { questions: any[]; title: string; id: string };
  setSelectedSet: (set: {
    questions: any[];
    title: string;
    id: string;
  }) => void;
}

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

export default function AddQuestionsForm(props: propsInfo) {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Called handleSubmit');
    console.log('Selected State: ' + props.selectedSet.title);
    // Just need to call update function now
    return;
  };

  return (
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
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField id='jobPosition' label='Experience level' required select>
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
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Button
              variant='contained'
              sx={{
                maxWidth: '50%',
                textAlign: 'center',
                backgroundColor: '#023047',
              }}
              type='submit'>
              Add Question
            </Button>
            <Button
              variant='contained'
              sx={{ textAlign: 'center', backgroundColor: '#023047' }}
              type='button'
              href='/browsequestions'>
              View Premade Questions
            </Button>
          </div>
        </FormControl>
        <br />
      </form>
    </div>
  );
}
