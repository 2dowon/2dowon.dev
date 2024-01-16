import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import filter from "lodash/filter";

import queryString from "query-string";

import { graphql, navigate } from "gatsby";
import TagList from "../components/TagList";
import PostList from "../components/PostList";
import Layout from "../components/Layout";
import { koreanTagNames } from "../utils/constants";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group: tags, nodes: posts },
  },
}) => {
  const [selected, setSelected] = useState();
  const [filteredPosts, setFilteredPosts] = useState([]);

  let query = null;
  if (typeof document !== "undefined") {
    query = document.location.search;
  }

  useEffect(() => {
    if (!selected) {
      setFilteredPosts(posts);
      return;
    }

    setFilteredPosts(
      filter(posts, (post) => post.frontmatter.tags.indexOf(selected) !== -1)
    );
  }, [selected, posts]);

  useEffect(() => {
    const _query = queryString.parse(query)["tag"];
    setSelected(_query);
  }, [query]);

  return (
    <Layout>
      <div>
        {selected ? (
          <div className="mb-[1rem] text-center text-body-4 font-bold italic pc:text-heading-6">
            {koreanTagNames[selected]}
          </div>
        ) : (
          <div className="mb-[1rem] text-center text-body-4 font-bold italic pc:text-heading-6">
            ALL POSTS
          </div>
        )}

        <TagList
          count={posts.length}
          tagList={tags}
          selected={selected}
          onClick={(tag) => {
            if (tag === selected) {
              navigate("/tags");
            } else {
              setSelected(tag);
            }
          }}
        />
      </div>
      <PostList postList={filteredPosts} />
    </Layout>
  );
};

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`;
