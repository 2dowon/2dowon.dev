import type { PropsWithChildren } from "react";
import React from "react";

import Header from "./Header";
import Bio from "./Bio";
import Footer from "./Footer";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="bg-gray-1">
      <Header />
      <div className="mx-auto flex max-w-[60rem] pt-[5rem] pc:flex-row-reverse mobile:flex-col">
        <div className="pc:fixed pc:pt-[1.25rem]">
          <Bio />
        </div>
        <main className="max-w-[45rem] p-[1.25rem] pc:mr-[18rem]">
          {children}
        </main>
      </div>
      <Footer className="pb-[3rem] text-center pc:hidden" />
    </div>
  );
};

export default Layout;
