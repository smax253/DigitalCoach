import { useState } from 'react';
import { TextField, FormControl, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import InterviewSetsService from '@App/lib/interviewSets/interviewSetsService';
import QuestionSetsService from '@App/lib/questionSets/QuestionSetsService';

interface userInfo {
  userId: string;
}

export default function BasicInfoForm({ userId }: userInfo) {
  const {} = useForm();
  const [interviewName, setInterviewName] = useState('');
  const [timePerQ, setTimePerQ] = useState('');
  const [numRetries, setNumRetries] = useState('');

  /**
   * This function will be called when the form is submitted.
   * On submission, it will create a question set with the set interview name
   * with the other parameters being left blank.
   * This will also create an inteview set with the given Interview Name and
   * the user inputted time per question and number of retries
   * @returns The created question set
   */
  const createInterviewSet = () => {
    console.log(`${interviewName}, ${timePerQ}, ${numRetries}`);
    //Create interview set first
    // !Does not work on safari for some reason
    // const interviewSet = {
    //   name: interviewName,
    //   minutesToAnswer: parseInt(timePerQ),
    //   numberOfRetries: parseInt(numRetries),
    //  };
    // console.log('Calling create function in BasicInfoForm');
    // InterviewSetsService.create(userId, interviewSet);
    //Now create question set
    const questionSet = {
      title: interviewName,
      description: '',
      questions: [],
      isFeatured: false,
      createdBy: userId,
    };
    return QuestionSetsService.createQuestionSet(questionSet);
  };

  return (
    <form onSubmit={createInterviewSet}>
      <FormControl fullWidth>
        <TextField
          type='text'
          label='Interview Name'
          placeholder='Interview Name'
          required
          onChange={(e) => setInterviewName(e.target.value)}
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
        <Button variant='contained' type='submit' sx={{ maxWidth: '30%' }}>
          Create Interview Set
        </Button>
      </FormControl>
    </form>
  );
}
