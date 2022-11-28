import Default from "@layouts/Default";
import { getListPage } from "@lib/contentParser";
import Head from "app/head";

const regularPageData = async () => {
  const testPage = await getListPage("content/test/_index.md");
  return {
    data: testPage,
  };
};

// for all regular pages
const TestPage = async () => {
  const { data } = await regularPageData();
  const { title, meta_title, description, image, noindex, canonical } =
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
      <Default data={data} />
    </>
  );
};
export default TestPage;

// for regular page data
// export const getStaticProps = async () => {

// };
