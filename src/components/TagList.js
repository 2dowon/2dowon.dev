import React from "react";
import { Link } from "gatsby";
import { koreanTagNames } from "../utils/constants";

const TagList = ({ tagList, count, selected, onClick }) => {
  if (!tagList) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-[0.8rem]">
      <Link to="/">
        <div
          className={`${
            selected == undefined
              ? "rounded-full bg-gray-9 text-white "
              : "text-black"
          } flex cursor-pointer px-[0.8rem] py-[0.2rem] text-center`}
        >
          All Posts
          <div className="pl-[5px]">({Number(count)})</div>
        </div>
      </Link>
      {tagList.map((tag, i) => {
        const isSelectedTag = selected === tag.fieldValue;
        return (
          <Link key={JSON.stringify({ tag, i })} to={`?tag=${tag.fieldValue}`}>
            <div
              className={`${
                isSelectedTag
                  ? "rounded-full bg-gray-9 text-white "
                  : "text-black"
              } flex cursor-pointer px-[0.8rem] py-[0.2rem] text-center`}
            >
              {koreanTagNames[tag.fieldValue] || tag.fieldValue}
              <div className="pl-[5px]">({tag.totalCount})</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TagList;
