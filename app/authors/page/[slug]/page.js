import Pagination from "@components/Pagination";
import config from "@config/config.json";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import Authors from "@partials/Authors";
import Head from "app/head";
const curentAuthorData = async (page) => {
  const currentPage = parseInt(page);
  const { pagination } = config.settings;
  const authors = getSinglePage("content/authors");
  // get list page
  const authorIndex = await getListPage("content/authors/_index.md");
  // totalPage
  const totalPages = Math.ceil(authors.length / pagination);
  // notFound condition
  if (totalPages < currentPage) {
    return notFound();
  }
  return {
    pagination: pagination,
    authors: authors,
    currentPage: currentPage,
    authorIndex: authorIndex,
    totalPages: totalPages,
  };
};
// blog pagination
const AuthorPagination = async ({ params: { slug } }) => {
  const {
    pagination,
    authors,
    currentPage,
    authorIndex: { frontmatter },
    totalPages,
  } = await curentAuthorData(slug);
  const indexOfLastAuthor = currentPage ? currentPage * pagination : pagination;
  const indexOfFirstAuthor = indexOfLastAuthor - pagination;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  return (
    <>
      <Head title={frontmatter.title} />
      <section className="section">
        <div className="container text-center">
          {markdownify(frontmatter.title, "h1", "h2 mb-16")}
          <Authors authors={currentAuthors} />
          <Pagination
            section={"authors"}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </>
  );
};

export default AuthorPagination;
