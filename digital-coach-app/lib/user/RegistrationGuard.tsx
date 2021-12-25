import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import useAuthContext from "../auth/AuthContext";
import AuthService from "../auth/AuthService";

function RegistrationGuard({
  children,
  router,
}: PropsWithChildren<WithRouterProps>) {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!AuthService.auth.currentUser) router.push("/auth/login");
    if (currentUser?.registrationCompletedAt) router.push("/");
  });

  return <>{children}</>;
}

export default withRouter(RegistrationGuard);
