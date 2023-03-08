import { useState } from 'react';
import { TextField, FormControl, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import QuestionSetsService from '@App/lib/questionSets/QuestionSetsService';

export default function BasicInfoForm() {
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

    //Now create question set
    //!Does not work on safari?
    const questionSet = {
      title: interviewName,
      description: '',
      questions: [],
      isFeatured: false,
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
