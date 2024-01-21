import { Link } from "gatsby";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  );
};

const PostList = ({ postList }) => {
  const [postCount, setPostCount] = useState(10);

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300);
    }
  }, 250);

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad);

    return () => {
      window.removeEventListener("scroll", handleMoreLoad);
    };
  }, [postCount, postList, handleMoreLoad]);

  useEffect(() => {
    setPostCount(10);
  }, [postList]);

  return (
    <div className="my-[1rem] flex flex-col gap-[2rem] pc:my-[3rem] pc:gap-[3rem]">
      {postList.slice(0, postCount).map((post) => {
        const { title, date, tags, thumbnail } = post.frontmatter;
        const { slug } = post.fields;

        return (
          <Link to={slug} itemProp="url">
            <article
              key={slug}
              className="rounded-[1rem] bg-white transition ease-in-out hover:scale-[1.01] hover:shadow-md"
              itemScope
              itemType="http://schema.org/Article"
            >
              <GatsbyImage
                objectFit="cover"
                style={{ height: "100%" }}
                image={thumbnail?.childImageSharp?.gatsbyImageData}
                alt={`${slug} cover image`}
                className="rounded-t-[1rem]"
              />

              <div className="px-[1rem] pb-[1rem] pt-[0.5rem] pc:px-[1.5rem] pc:pb-[2rem] pc:pt-[1rem]">
                <header>
                  <div className="mb-[1rem] text-body-4 font-bold text-gray-10 pc:text-heading-5">
                    {title}
                  </div>
                  <small className="flex justify-end text-gray-7">{date}</small>
                </header>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default PostList;
