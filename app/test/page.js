import Default from "@layouts/Default";
import { getListPage } from "@lib/contentParser";
import Head from "app/head";

// for all regular pages
const TestPage = async () => {
  const testPage = await getListPage("content/test/_index.md");
  const { title, meta_title, description, image, noindex, canonical } =
    testPage.frontmatter;
  const { content } = testPage;

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
      <Default data={testPage} />
    </>
  );
};
export default TestPage;
