import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/Bio";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Tag from "../components/Tag";
import { Utterances } from "../components/Utterances";

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`;
  const utterances = site.siteMetadata.comment.utterances;

  return (
    <Layout location={location} title={siteTitle}>
      <article itemScope itemType="http://schema.org/Article">
        <header className="mb-[2rem] w-full border-b-[1px] border-gray-4">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div className="mb-[2rem] mt-[1rem] flex">
            <div className="flex gap-[0.5rem]">
              {post.frontmatter.tags.map((tag) => {
                return <Tag tag={tag} />;
              })}
            </div>
            <div className="w-full text-right text-sm italic text-gray-8">
              {post.frontmatter.date}
            </div>
          </div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="pb-[3rem]"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav mb-[5rem]">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li
            className={`flex max-w-[45%] list-none items-center justify-center rounded-md bg-gray-3 px-[1rem] py-[0.5rem] ${
              !previous && "invisible"
            }`}
          >
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <span className="text-detail-4 font-medium text-gray-10">
                  ← {previous.frontmatter.title}
                </span>
              </Link>
            )}
          </li>
          <li
            className={`flex max-w-[45%] list-none items-center justify-center rounded-md bg-gray-3 px-[1rem] py-[0.5rem] ${
              !next && "invisible"
            }`}
          >
            {next && (
              <Link to={next.fields.slug} rel="next">
                <span className="text-detail-4 font-medium text-gray-10">
                  {next.frontmatter.title} →
                </span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      {!!utterances && <Utterances repo={utterances} theme="github-light" />}
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post } }) => {
  return <Seo title={post.frontmatter.title} />;
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        comment {
          utterances
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
