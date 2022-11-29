import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { notFound } from "next/navigation";

// server function
const allposts = async (single) => {
  const { blog_folder } = config.settings;
  const allposts = getSinglePage(`content/${blog_folder}`);
  const posts = allposts.filter((p) => p.slug === single);
  if (!posts.length) {
    return notFound();
  }
  const authors = getSinglePage("content/authors");
  const mdxContent = await parseMDX(posts[0].content);
  const { frontmatter, content } = posts[0];
  return {
    authors,
    frontmatter,
    content,
    mdxContent,
  };
};

const Single = async ({ params: { single } }) => {
  const { frontmatter, authors, content, mdxContent } = await allposts(single);
  return (
    <>
      <PostSingle
        frontmatter={frontmatter}
        content={content}
        mdxContent={mdxContent}
        authors={authors}
        slug={single}
      />
    </>
  );
};

export default Single;
// genarate static path
export const generateStaticParams = async () => {
  const posts = getSinglePage("content/posts");

  return posts.map((post) => ({
    single: post.slug,
  }));
};
