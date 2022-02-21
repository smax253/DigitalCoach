import AuthGuard from "@App/lib/auth/AuthGuard";

export default function SettingsPage() {
  return (
    <AuthGuard>
      <h1>Settings Page</h1>
    </AuthGuard>
  );
}
