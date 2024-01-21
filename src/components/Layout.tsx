import type { PropsWithChildren } from "react";
import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  children,
  mainClassName,
  footerClassName,
}: PropsWithChildren<{ mainClassName: string; footerClassName: string }>) => {
  return (
    <>
      <Header />
      <div className={mainClassName}>{children}</div>
      <Footer className={`pb-[3rem] text-center ${footerClassName}`} />
    </>
  );
};

export default Layout;
