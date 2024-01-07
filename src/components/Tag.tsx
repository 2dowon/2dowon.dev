import { Link } from "gatsby";
import React from "react";
import { koreanTagNames } from "../utils/constants";

const Tag = ({ tag }: { tag: string }) => {
  return (
    <Link key={tag} to={`/tags?query=${tag}`}>
      <div className="cursor-pointer rounded-full bg-gray-4 px-[0.8rem] py-[0.3rem] text-center text-detail-4 text-gray-8">
        {koreanTagNames[tag!] || tag}
      </div>
    </Link>
  );
};

export default Tag;
