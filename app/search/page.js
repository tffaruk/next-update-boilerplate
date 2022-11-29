import { getSinglePage } from "@lib/contentParser";
import SeacrchPosts from "./SeacrchPosts";

const SearchPage = (props) => {
  const authors = getSinglePage("content/authors");
  return <SeacrchPosts authors={authors} />;
};
export default SearchPage;
