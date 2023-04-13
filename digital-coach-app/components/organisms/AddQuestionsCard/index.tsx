import Card from '@App/components/atoms/Card';
import AuthGuard from '@App/lib/auth/AuthGuard';
//import { TextField } from "@App/components/molecules/TextField";
import SelectedQuestionsList from './SelectedQuestionsList';
import AddQuestionsForm from './AddQuestionsForm';

export default function AddQuestionsCard() {
  return (
    <AuthGuard>
      <Card title='Add Questions'>
        <div style={{ display: 'flex', gap: '3rem' }}>
          <AddQuestionsForm />
          <SelectedQuestionsList />
        </div>
      </Card>
    </AuthGuard>
  );
}
