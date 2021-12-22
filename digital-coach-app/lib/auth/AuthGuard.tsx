import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import AuthService from "./AuthService";

function AuthGuard({ children, router }: PropsWithChildren<WithRouterProps>) {
  const { setUser, user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      setUser(user || null);
      setIsLoading(false);
    });
  }, [setUser]);

  console.log(user);

  if (isLoading) return <h1>Loading...</h1>;
  if (!user) router.push("/auth/login");

  return <>{children}</>;
}

export default withRouter(AuthGuard);
