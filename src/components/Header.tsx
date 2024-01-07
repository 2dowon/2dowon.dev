import { Link } from "gatsby";
import * as React from "react";
import { FaTags } from "react-icons/fa";

const Header = () => {
  return (
    <header className="mt-0 flex w-full items-center justify-between border-b-[1px] border-gray-2 px-[1rem] pc:px-[5rem]">
      <h1 className="mt-[1rem] font-serif text-heading-6">
        <Link to="/">2dowon's log</Link>
      </h1>
      <div>
        <Link
          to="/tags"
          className="text-body-4 text-gray-7 pc:hover:text-green"
        >
          <FaTags />
        </Link>
      </div>
    </header>
  );
};

export default Header;
