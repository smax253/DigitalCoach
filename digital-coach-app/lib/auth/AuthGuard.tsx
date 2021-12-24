import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import UserService from "../user/UserService";
import useAuthContext from "./AuthContext";
import AuthService from "./AuthService";

function AuthGuard({ children, router }: PropsWithChildren<WithRouterProps>) {
  const { setUser, user } = useAuthContext();

  AuthService.onAuthStateChanged(async (newUser) => {
    const isSignedIn = AuthService.isSignedIn();
    if (!isSignedIn) router.push("/auth/login");
    else {
      if (user?.id !== newUser?.uid) {
        const userDetails = await UserService.getUser(newUser!.uid);
        setUser(userDetails);
      } else if (!user?.registrationCompletedAt) {
        router.push("/auth/register");
      }
    }
  });

  return <>{children}</>;
}

export default withRouter(AuthGuard);
