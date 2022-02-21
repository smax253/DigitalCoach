import AuthGuard from "@App/lib/auth/AuthGuard";

export default function ResourcesPage() {
  return (
    <AuthGuard>
      <h1>Resources Page</h1>
    </AuthGuard>
  );
}
