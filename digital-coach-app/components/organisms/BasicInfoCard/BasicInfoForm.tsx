import { useState } from 'react';
import {
  TextField,
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import InterviewSetsService from '@App/lib/interviewSets/interviewSetsService';
import QuestionSetsService from '@App/lib/questionSets/QuestionSetsService';

interface userInfo {
  userId: string;
}

export default function BasicInfoForm({ userId }: userInfo) {
  const {} = useForm();
  const [questionSetName, setQuestionSetName] = useState('');
  const [timePerQ, setTimePerQ] = useState('');
  const [numRetries, setNumRetries] = useState('');
  const [makeInterview, setMakeInterview] = useState(false);

  /**
   * This function will be called when the form is submitted.
   * On submission, it will create a question set with the set interview name
   * with the other parameters being left blank.
   * This will also create an inteview set with the given Interview Name and
   * the user inputted time per question and number of retries
   * @returns The created question set
   */
  const createInterviewSet = async () => {
    console.log(`${questionSetName}, ${timePerQ}, ${numRetries}`);
    //Create interview set first
    // !Does not work on safari for some reason
    //Now create question set
    const questionSet = {
      title: questionSetName,
      description: '',
      questions: [],
      isFeatured: false,
      createdBy: userId,
    };
    const thisQuestionSet = await QuestionSetsService.createQuestionSet(
      questionSet
    );
    // TODO: Figure out how to add a reference to question set in the interviewSets collection
    console.log(thisQuestionSet);
    if (makeInterview) {
      const interviewSet = {
        name: questionSetName,
        minutesToAnswer: parseInt(timePerQ),
        numberOfRetries: parseInt(numRetries),
      };
      console.log('Calling create function in BasicInfoForm');
      InterviewSetsService.create(userId, interviewSet);
    }
  };

  return (
    <form onSubmit={createInterviewSet}>
      <FormControl fullWidth>
        <TextField
          type='text'
          label='Question Set Name'
          placeholder='Give the question set a fitting name'
          required
          onChange={(e) => setQuestionSetName(e.target.value)}
        />
        <br />
        <TextField
          type='number'
          label='Minutes Given to Answer'
          placeholder='How long do you have per question?'
          defaultValue=''
          helperText='Leave blank for no time limit'
          onChange={(e) => setTimePerQ(e.target.value)}
        />
        <br />
        <TextField
          type='number'
          label='Number of Retries Per Question'
          placeholder='How many times can you retry the question?'
          defaultValue=''
          helperText='Leave blank for no limit on retries'
          onChange={(e) => setNumRetries(e.target.value)}
        />
        <br />
        <div>
          <Button variant='contained' type='submit' sx={{ maxWidth: '30%' }}>
            Create Question Set
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={makeInterview}
                onChange={() => {
                  setMakeInterview(!makeInterview);
                }}
                sx={{ paddingLeft: '25px' }}
              />
            }
            label='Create Interview Set with this Question Set'
          />
        </div>
      </FormControl>
    </form>
  );
}
