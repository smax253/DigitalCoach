import React, { useState } from 'react';
import Card from '@App/components/atoms/Card';
import AuthGuard from '@App/lib/auth/AuthGuard';
import SelectedQuestionsList from './SelectedQuestionsList';
import QuestionCarousel from './QuestionCarousel';

interface propInfo {
  isLocked: boolean;
  setIsLocked: (arg0: boolean) => void;
  questions: any[];
  setQuestions: (arg0: any[]) => void;
  showQuestions: boolean;
  setShowQuestions: (arg0: boolean) => void;
}

export default function SelectQuestionSetCard(props: propInfo) {
  const [selectedSet, setSelectedSet] = useState<any>({
    questions: [],
    id: '',
    title: '',
  });
  return (
    <AuthGuard>
      <Card title='Questions for Interview'>
        <div style={{ display: 'flex', gap: '3rem' }}>
          {props.isLocked ? (
            props.questions.length === 0 ? (
              <p>
                You didn't choose a question set! Click stop recording and try
                again
              </p>
            ) : (
              // Here, need to render a carousel of the questions
              <QuestionCarousel questions={props.questions} />
            )
          ) : (
            <div>
              <p>Choose your question set and start recording when ready</p>
              <SelectedQuestionsList
                selectedSet={selectedSet}
                setSelectedSet={setSelectedSet}
                questions={props.questions}
                setQuestions={props.setQuestions}
                showQuestions={props.showQuestions}
                setShowQuestions={props.setShowQuestions}
              />
            </div>
          )}
        </div>
      </Card>
    </AuthGuard>
  );
}
