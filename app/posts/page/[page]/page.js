import Pagination from "@layouts/components/Pagination";
import Posts from "@layouts/partials/Posts";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import Head from "app/head";
import config from "config/config.json";
import { notFound } from "next/navigation";

const cuurentPageData = async (page) => {
  const currentPage = parseInt(page ? page : 1);

  const { pagination, blog_folder } = config.settings;
  const authors = getSinglePage("content/authors");
  // get list page
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);
  // get allPosts
  const posts = getSinglePage(`content/${blog_folder}`);
  const totalPages = Math.ceil(posts.length / pagination);

  // notFound condition
  if (totalPages < currentPage) {
    return notFound();
  }
  return {
    pagination: pagination,
    posts: posts,
    authors: authors,
    currentPage: currentPage,
    postIndex: postIndex,
    totalPages: totalPages,
    blog_folder: blog_folder,
  };
};

const Pagignation = async ({ params: { page: currentPage } }) => {
  const {
    pagination,
    postIndex: { frontmatter },
    posts,
    authors,
    totalPages,
    blog_folder,
  } = await cuurentPageData(currentPage);
  // page distribution
  const indexOfLastPost = currentPage
    ? currentPage * pagination
    : 1 * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Head title={frontmatter.title} />
      <section className="section">
        <div className="container">
          {markdownify(frontmatter.title, "h1", "h2 mb-8 text-center")}
          <Posts posts={currentPosts} authors={authors} />
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </>
  );
};

export default Pagignation;

// genarate static path
export async function generateStaticParams() {
  const { pagination } = config.settings;
  const posts = getSinglePage("content/posts");
  const totalPages = Math.ceil(posts.length / pagination);
  let paths = [];
  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths.map((path) => ({
    page: path.page,
  }));
}
