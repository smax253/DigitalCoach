import AuthGuard from "@App/lib/auth/AuthGuard";

export default function PastInterviewPage() {
  return (
    <AuthGuard>
      <h1>Review Past Interview Page</h1>
    </AuthGuard>
  );
}
