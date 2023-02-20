import React from "react";

function Layout(props) {
  const { children } = props;

  return (
    <React.Fragment>
      <main>{children}</main>
    </React.Fragment>
  );
}

export default Layout;
