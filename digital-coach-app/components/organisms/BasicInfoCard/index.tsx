import Card from '@App/components/atoms/Card';
import BasicInfoForm from './BasicInfoForm';

interface userInfo {
  userId: string;
}

export default function BasicInfoCard(userInfo: userInfo) {
  return (
    <Card title='New Question Set Information'>
      <BasicInfoForm {...userInfo} />
    </Card>
  );
}
