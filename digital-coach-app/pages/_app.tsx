import type { AppProps } from "next/app";

import "@App/styles/globals.css";
import "@App/lib/firebase/firebase.config";
import Layout from "@App/components/Layout";
import { AuthContextProvider } from "@App/lib/auth/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
