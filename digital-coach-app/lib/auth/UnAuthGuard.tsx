import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { PropsWithChildren } from "react";
import AuthService from "./AuthService";

function UnAuthGuard({ children, router }: PropsWithChildren<WithRouterProps>) {
  if (AuthService.isSignedIn()) router.push("/");

  return <>{children}</>;
}

export default withRouter(UnAuthGuard);
