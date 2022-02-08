import type { NextPage } from "next";
import Image from "next/image";
import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import styles from "@App/styles/Home.module.scss";

const Home: NextPage = () => {
  const { currentUser } = useAuthContext();

  return (
    <AuthGuard>
      <div className={styles.Home}>
        {currentUser?.avatarUrl && (
          <Image
            src={currentUser.avatarUrl}
            height={144}
            width={144}
            alt="avatar"
          />
        )}
        <span>id: {currentUser?.id}</span>
        <span>email: {currentUser?.email}</span>
        <span>name: {currentUser?.name}</span>
        <span>concentration: {currentUser?.concentration}</span>
        <span>proficiency: {currentUser?.proficiency}</span>
      </div>
    </AuthGuard>
  );
};

export default Home;
