/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

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
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="flex items-center mb-[4rem] bio">
      <StaticImage
        className="rounded-[100%] min-w-[5rem] mr-[1rem]"
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
          <div className="font-bold text-detail-1 bg-green py-[0.3rem] rounded-md text-ivory text-center w-[6rem] font-serif">
            @{author.name}
          </div>
          <div className="text-gray-8 mb-[0.5rem] mt-[0.2rem]">
            {author?.summary || null}
          </div>
          <div className="flex gap-[1rem]">
            <a
              className="pc:hover:text-green text-gray-10"
              href={`https://github.com/${social?.github || ``}`}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio
