import Head from "next/head";
import styles from "./layout.module.scss";
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

export const siteTitle = "Digital Coach";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <title>Digital Coach</title>
        <meta name="description" content="Senior Design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page_container}>
        <NavBar />
        <div className={styles.container}>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
