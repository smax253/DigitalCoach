import "../styles/globals.css";
import type { AppProps } from "next/app";

import "../lib/firebase.config";
import { AuthProvider } from "../lib/auth/AuthContextProvider";
import AuthGuard from "../lib/auth/AuthGuard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </AuthProvider>
  );
}

export default MyApp;
