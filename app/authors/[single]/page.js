import AuthorSingle from "@layouts/AuthorSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { notFound } from "next/navigation";

const authourData = async (single) => {
  const getAuthors = getSinglePage("content/authors");
  const author = getAuthors.filter((author) => author.slug == single);
  if (!author.length) {
    return notFound();
  }
  const mdxContent = await parseMDX(author[0].content);
  return {
    author: author,
    mdxContent: mdxContent,
  };
};

// post single layout
const Article = async ({ params: { single } }) => {
  const { author, mdxContent } = await authourData(single);
  const { frontmatter, content } = author[0];

  return (
    <AuthorSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
    />
  );
};

// genarate static path
export const generateStaticParams = async () => {
  const posts = getSinglePage("content/authors");
  console.log(posts);
  return posts.map((post) => ({
    single: post.slug,
  }));
};

export default Article;
