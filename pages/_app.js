import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { Fragment } from "react";

import Layout from "../components/Layout/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Fragment>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Fragment>
  );
}
