"use client";
import Posts from "@layouts/partials/Posts";
import React, { useEffect, useState } from "react";
import { useSearchContext } from "context/state";
import { slugify } from "@lib/utils/textConverter";
import Head from "app/head";
// import { useSearchParams } from "next/navigation";

const SeacrchPosts = ({ authors, searchParams }) => {
  const keyword = slugify(searchParams.key);
  const { posts } = useSearchContext();
  const searchResults = posts.filter((product) => {
    if (slugify(product.frontmatter.title).includes(keyword)) {
      return product;
    } else if (
      product.frontmatter.categories.find((category) =>
        slugify(category).includes(keyword)
      )
    ) {
      return product;
    } else if (
      product.frontmatter.tags.find((tag) => slugify(tag).includes(keyword))
    ) {
      return product;
    } else if (slugify(product.content).includes(keyword)) {
      return product;
    }
  });
  return (
    <>
      <Head title={`Search results for ${keyword}`} />

      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Search results for <span className="text-primary">{keyword}</span>
          </h1>
          {searchResults.length > 0 ? (
            <Posts posts={searchResults} authors={authors} />
          ) : (
            <div className="py-24 text-center text-h3 shadow">
              No Search Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SeacrchPosts;
