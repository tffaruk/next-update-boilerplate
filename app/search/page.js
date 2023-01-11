import { getSinglePage } from "@lib/contentParser";
import SeacrchPosts from "./SeacrchPosts";
import "server-only";
export const dynamicParams = true;
const SearchPage = ({ searchParams }) => {
  const authors = getSinglePage("content/authors");

  return (
    <>
      <SeacrchPosts authors={authors} searchParams={searchParams} />
    </>
  );
};
export default SearchPage;
