import "../styles/globals.css";
import type { AppProps } from "next/app";

import "../lib/firebase.config";
import { AuthProvider } from "../lib/auth/AuthContextProvider";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
