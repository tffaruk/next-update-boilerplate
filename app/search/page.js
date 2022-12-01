import { getSinglePage } from "@lib/contentParser";
import SeacrchPosts from "./SeacrchPosts";
import "server-only";

const SearchPage = ({ searchParams }) => {
  const authors = getSinglePage("content/authors");

  return (
    <>
      <SeacrchPosts authors={authors} searchParams={searchParams} />
    </>
  );
};
export default SearchPage;
