import type { NextPage } from "next";
import Image from "next/image";
import useAuthContext from "../lib/auth/AuthContext";
import AuthGuard from "../lib/auth/AuthGuard";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { user } = useAuthContext();

  return (
    <AuthGuard>
      <div className={styles.Home}>
        {user?.avatarUrl && (
          <Image src={user.avatarUrl} height={144} width={144} alt="avatar" />
        )}
        <span>id: {user?.id}</span>
        <span>email: {user?.email}</span>
        <span>name: {user?.name}</span>
        <span>concentration: {user?.concentration}</span>
        <span>proficiency: {user?.proficiency}</span>
        <span>createdAt: {user?.createdAt}</span>
        <span>registrationCompletedAt: {user?.registrationCompletedAt}</span>
      </div>
    </AuthGuard>
  );
};

export default Home;
