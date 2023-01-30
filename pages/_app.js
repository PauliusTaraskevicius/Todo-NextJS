import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { Fragment } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Fragment>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Fragment>
  );
}
