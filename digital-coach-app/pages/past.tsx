import AuthGuard from "@App/lib/auth/AuthGuard";

export default function PastInterviewPage() {
  return (
    <AuthGuard>
      <h1>Past Interviews</h1>
    </AuthGuard>
  );
}
