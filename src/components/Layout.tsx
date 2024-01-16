import type { PropsWithChildren } from "react";
import React from "react";

import Header from "./Header";
import Bio from "./Bio";

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
      <footer className="mt-[5rem] text-center">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com" className="ml-[0.3rem] text-green">
          Gatsby
        </a>
      </footer>
    </div>
  );
};

export default Layout;
