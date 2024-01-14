import type { PropsWithChildren } from "react";
import React from "react";

import Header from "./Header";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-[42rem] p-[1.25rem] pc:py-[2.5rem]">
        {children}
      </main>
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
