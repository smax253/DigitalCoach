import React, { useState } from 'react';
import Card from '@App/components/atoms/Card';
import AuthGuard from '@App/lib/auth/AuthGuard';
//import { TextField } from "@App/components/molecules/TextField";
import SelectedQuestionsList from './SelectedQuestionsList';
import AddQuestionsForm from './AddQuestionsForm';

export default function AddQuestionsCard() {
  const [selectedSet, setSelectedSet] = useState<any>({
    questions: [],
    id: '',
    title: '',
  });
  return (
    <AuthGuard>
      <Card title='Add Questions'>
        <div style={{ display: 'flex', gap: '3rem' }}>
          <AddQuestionsForm
            selectedSet={selectedSet}
            setSelectedSet={setSelectedSet}
          />
          <SelectedQuestionsList
            selectedSet={selectedSet}
            setSelectedSet={setSelectedSet}
          />
        </div>
      </Card>
    </AuthGuard>
  );
}
