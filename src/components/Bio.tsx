/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <div className="bio mb-[4rem] flex items-center">
      <StaticImage
        className="mr-[1rem] min-w-[5rem] rounded-[100%]"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.jpeg"
        width={100}
        height={100}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <div>
          <div className="w-[6rem] rounded-md bg-green py-[0.3rem] text-center font-serif text-detail-1 font-bold text-ivory">
            @{author.name}
          </div>
          <div className="mb-[0.5rem] mt-[0.2rem] text-gray-8">
            {author?.summary || null}
          </div>
          <div className="flex gap-[1rem]">
            <a
              className="text-gray-10 pc:hover:text-green"
              href={`https://github.com/${social?.github || ``}`}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
