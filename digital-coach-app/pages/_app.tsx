import type { AppProps } from "next/app";

import "@App/styles/globals.css";
import "@App/lib/firebase/firebase.config";
import Layout from "@App/components/Layout";
import { AuthContextProvider } from "@App/lib/auth/AuthContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
