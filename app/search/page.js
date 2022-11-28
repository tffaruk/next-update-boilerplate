import { getSinglePage } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import Head from "app/head";
import SeacrchPosts from "./SeacrchPosts";

const SearchPage = () => {
  const authors = getSinglePage("content/authors");
  return <SeacrchPosts authors={authors} />;
};

export default SearchPage;

// get authors data
