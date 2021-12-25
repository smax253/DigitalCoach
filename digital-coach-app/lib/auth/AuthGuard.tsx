import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import useAuthContext from "./AuthContext";
import AuthService from "./AuthService";

function AuthGuard({ children, router }: PropsWithChildren<WithRouterProps>) {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    AuthService.onAuthStateChanged(async () => {
      const isSignedIn = AuthService.isSignedIn();

      if (!isSignedIn) router.push("/auth/login");
    });

    if (currentUser && !currentUser?.registrationCompletedAt)
      router.push("/auth/register");
  }, [currentUser, router]);

  return <>{children}</>;
}

export default withRouter(AuthGuard);
