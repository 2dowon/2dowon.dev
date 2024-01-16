import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import Contact from "./Contact";
import Profile from "./Profile";

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
            linkedin
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <div className="flex w-full flex-col gap-[1rem] p-[1rem] pc:w-[15rem] pc:p-0">
      <Profile author={author} />
      <Contact social={social} />
    </div>
  );
};

export default Bio;
