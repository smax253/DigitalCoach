import Card from "@App/components/atoms/Card";
import BasicInfoCard from "@App/components/organisms/BasicInfoCard";
import AuthGuard from "@App/lib/auth/AuthGuard";

export default function StartInterviewPage() {
  return (
    <AuthGuard>
      <BasicInfoCard />
      <Card title="Add Questions"></Card>
    </AuthGuard>
  );
}
