/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import type { PropsWithChildren } from "react";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Seo = ({
  description,
  title,
  children,
}: PropsWithChildren<{ description: string; title: string }>) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              github
              linkedin
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>
        {defaultTitle === title ? title : `${title} | ${defaultTitle}`}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {children}
    </>
  );
};

export default Seo;
