import React from "react";
import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";


import Layout from "../components/Layout/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <React.Fragment>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </React.Fragment>
  );
}
