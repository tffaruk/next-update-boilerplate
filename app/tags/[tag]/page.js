import config from "@config/config.json";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import Head from "app/head";
const allTagPages = async (tag) => {
  const { blog_folder } = config.settings;
  const allTags = getTaxonomy(`content/${blog_folder}`, "tags");
  if (!allTags.includes(tag)) {
    return notFound();
  }
  const posts = getSinglePage(`content/${blog_folder}`);
  const filterPosts = posts.filter((post) =>
    post.frontmatter.tags.find((tags) => slugify(tags).includes(tag))
  );
  const authors = getSinglePage("content/authors");
  return {
    posts: filterPosts,
    authors: authors,
  };
};

// tag page
const Tag = async ({ params: { tag } }) => {
  const { posts, authors } = await allTagPages(tag);
  return (
    <>
      <Head title={tag} />
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{tag}</span> tag
          </h1>
          <Posts posts={posts} authors={authors} />
        </div>
      </div>
    </>
  );
};

export default Tag;
