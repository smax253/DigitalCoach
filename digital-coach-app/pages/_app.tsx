import "../styles/globals.css";
import type { AppProps } from "next/app";

import "../lib/firebase/firebase.config";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../lib/auth/AuthContextProvider";

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
