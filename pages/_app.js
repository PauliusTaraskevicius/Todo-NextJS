import React from "react";
import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <React.Fragment>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </React.Fragment>
  );
}
