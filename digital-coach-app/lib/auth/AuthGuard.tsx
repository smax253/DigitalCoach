import { getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";
import useAuthContext from "./AuthContextProvider";

export default function AuthGuard({ children }: PropsWithChildren<{}>) {
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setIsLoading(false);
    });
  }, [setUser]);

  if (isLoading) return <h1>Loading...</h1>;

  return <>{children}</>;
}
