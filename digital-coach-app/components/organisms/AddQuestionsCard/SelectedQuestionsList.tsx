import React, { useState, useEffect } from 'react';
import useAuthContext from '@App/lib/auth/AuthContext';
import { MenuItem, Select, InputLabel } from '@mui/material';
import QuestionService from '@App/lib/question/QuestionService';
import styles from './AddQuestionsCard.module.scss';
import QuestionSetsService from '@App/lib/questionSets/QuestionSetsService';

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

export default function SelectedQuestionsList() {
  const { currentUser } = useAuthContext();
  const [userQuestionSets, setUserQuestionSets] = useState<any[]>([]);
  const [selectedSet, setSelectedSet] = useState<any>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserQuestionSets() {
      const userQuestionSets: any[] = (
        await QuestionSetsService.getQuestionSetByUserId(currentUser!.id)
      ).docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setUserQuestionSets(userQuestionSets);
    }
    fetchUserQuestionSets();
  }, []);

  useEffect(() => {
    // Fires when a question set is selected, need to get the corresponding questions and show them
    console.log('selectedSet useEffectFired');
    const fetchQuestions = async () => {
      const selectedQuestions: any[] = [];
      console.log(selectedSet);
      for (let i = 0; i < selectedSet.length; i++) {
        selectedQuestions.push(await QuestionService.getById(selectedSet[i]));
      }
      // Need this console.log for function to work?
      console.log(selectedQuestions);
      setQuestions(selectedQuestions);
    };
    setLoading(true);
    fetchQuestions();
    setLoading(false);
  }, [selectedSet]);

  return (
    <div className={styles.AddQuestionsCard_questionList}>
      <InputLabel id='question-set-select-label'>Question Set</InputLabel>
      <Select
        labelId='question-set-select-label'
        id='question-set-select'
        label='Question Set'
        variant='standard'
        value={selectedSet}
        fullWidth
        onChange={(event) => setSelectedSet(event.target.value)}>
        {userQuestionSets.map((questionSet) => (
          <MenuItem key={questionSet.id} value={questionSet.questions}>
            {questionSet.title}
          </MenuItem>
        ))}
      </Select>
      {loading && questions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Currently Selected Questions:</p>
          {questions.map((question) => {
            return (
              <p key={question._key.path.segments[1]}>
                {
                  question._document.data.value.mapValue.fields.question
                    .stringValue
                }
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
