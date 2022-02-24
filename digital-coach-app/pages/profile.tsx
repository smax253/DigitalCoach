import Avatar from "@App/components/atoms/Avatar";
import Card from "@App/components/atoms/Card";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";

import styles from "@App/styles/ProfilePage.module.scss";

function ProfilePage() {
  const { currentUser } = useAuthContext();

  return (
    <div className={styles.ProfilePage}>
      <h1>Your Profile</h1>

      <div className={styles.ProfilePage_avatarWrapper}>
        {currentUser?.avatarUrl && (
          <Avatar size={125} src={currentUser.avatarUrl} />
        )}
      </div>

      <div className={styles.ProfilePage_body}>
        <div className={styles.ProfilePage_bodyLeft}>
          <Card title="Name">{currentUser?.name}</Card>
          <Card title="Email">{currentUser?.email}</Card>
        </div>

        <div className={styles.ProfilePage_bodyRight}>
          <Card title="Major">{currentUser?.concentration}</Card>
          <Card title="Experience Level">{currentUser?.proficiency}</Card>
          <Card title="Interested Roles">We dont got this info yet</Card>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  );
}
