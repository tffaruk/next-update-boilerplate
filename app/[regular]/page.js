import About from "@layouts/About";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import Head from "app/head";
import { notFound } from "next/navigation";

const allRegulerPages = async (regular) => {
  const allPages = await getRegularPage(regular);
  return {
    data: allPages,
  };
};

// for all regular pages
const RegularPages = async ({ params: { regular } }) => {
  const { data } = await allRegulerPages(regular);
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  return (
    <>
      <Head
        title={title}
        description={description ? description : content.slice(0, 120)}
        meta_title={meta_title}
        image={image}
        noindex={noindex}
        canonical={canonical}
      />
      {layout === "about" ? (
        <About data={data} />
      ) : layout === "contact" ? (
        <Contact data={data} />
      ) : (
        <Default data={data} />
      )}
    </>
  );
};
export default RegularPages;

// genarate static slug
export async function generateStaticParams() {
  const posts = getSinglePage("content");
  console.log(posts);
  return posts.map((post) => ({
    regular: post.slug,
  }));
}
