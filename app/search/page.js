import { getSinglePage } from "@lib/contentParser";
import SeacrchPosts from "./SeacrchPosts";
import "server-only";

const SearchPage = ({ searchParams }) => {
  const authors = getSinglePage("content/authors");
  return (
    <>
      <p>{searchParams.key}</p>
      <SeacrchPosts authors={authors} searchParams={searchParams} />
    </>
  );
};
export default SearchPage;
