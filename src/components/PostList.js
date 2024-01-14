import { Link } from "gatsby";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import Tag from "./Tag";

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
    <div>
      {postList.slice(0, postCount).map((post) => {
        const { title, date, tags, thumbnail } = post.frontmatter;
        const { slug } = post.fields;

        return (
          <article
            key={slug}
            className="group my-[2rem] border-b-[1px] border-gray-4 py-[2rem]"
            itemScope
            itemType="http://schema.org/Article"
          >
            <Link to={slug} itemProp="url">
              <div className="mb-[1rem]">
                <GatsbyImage
                  objectFit="cover"
                  style={{ height: "100%" }}
                  image={thumbnail?.childImageSharp?.gatsbyImageData}
                  alt={`${slug} cover image`}
                  className="rounded-[1rem]"
                />
              </div>
              <header>
                <div className="mb-[1rem] text-body-2 font-bold text-gray-10 pc:text-heading-5 pc:group-hover:text-green">
                  {title}
                </div>
                <small className="flex justify-end text-gray-7">{date}</small>
              </header>
            </Link>

            <div className="mt-[1rem] flex gap-[0.5rem]">
              {tags &&
                tags.map((tag) => {
                  return <Tag tag={tag} />;
                })}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PostList;
