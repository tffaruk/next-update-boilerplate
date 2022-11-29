import config from "@config/config.json";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import { notFound } from "next/navigation";

const allCategoryPages = async (category) => {
  const { blog_folder } = config.settings;
  const allCategories = getTaxonomy(`content/${blog_folder}`, "categories");
  if (!allCategories.includes(category)) {
    return notFound();
  }
  const posts = getSinglePage(`content/${blog_folder}`);
  const filterPosts = posts.filter((post) =>
    post.frontmatter.categories.find((categoris) =>
      slugify(categoris).includes(category)
    )
  );
  const authors = getSinglePage("content/authors");
  return {
    posts: filterPosts,
    authors: authors,
  };
};

// category page
const Category = async ({ params: { category } }) => {
  const { posts, authors } = await allCategoryPages(category);
  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{category}</span>{" "}
            category
          </h1>
          <Posts posts={posts} authors={authors} />
        </div>
      </div>
    </>
  );
};

export default Category;

// static path genrator
export const generateStaticParams = async () => {
  const { blog_folder } = config.settings;
  const allCategories = getTaxonomy(`content/${blog_folder}`, "categories");
  return allCategories.map((category) => ({
    category: category,
  }));
};
