import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { PropsWithChildren } from "react";
import useAuthContext from "../auth/AuthContext";
import AuthService from "../auth/AuthService";

function RegistrationGuard({
  children,
  router,
}: PropsWithChildren<WithRouterProps>) {
  const { user } = useAuthContext();

  if (!AuthService.isSignedIn()) router.push("/auth/login");
  if (user?.registrationCompletedAt) router.push("/");

  return <>{children}</>;
}

export default withRouter(RegistrationGuard);
