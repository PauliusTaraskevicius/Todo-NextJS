import { Fragment } from "react";

import Navbar from "../ui/navbar";
import Footer from "../ui/footer";

function Layout(props) {
  const { children } = props;

  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>

    </Fragment>
  );
}

export default Layout;
