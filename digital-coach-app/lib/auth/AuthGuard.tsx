import React, { PropsWithChildren, useEffect } from "react";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";

import useAuthContext from "@App/lib/auth/AuthContext";
import AuthService from "@App/lib/auth/AuthService";

function AuthGuard({ children, router }: PropsWithChildren<WithRouterProps>) {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    AuthService.onAuthStateChanged(async () => {
      const isSignedIn = AuthService.isSignedIn();

      if (!isSignedIn) router.push("/auth/login");
    });

    if (currentUser && !currentUser?.data()?.registrationCompletedAt)
      router.push("/auth/register");
  }, [currentUser, router]);

  if (!currentUser) return null;

  return <>{children}</>;
}

export default withRouter(AuthGuard);
