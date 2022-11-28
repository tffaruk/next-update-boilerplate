import { getRegularPage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";

const NotFound = async () => {
  const notFoundData = await getRegularPage("404");
  const { frontmatter, content } = notFoundData;

  return (
    <section className="section">
      <div className="container">
        <div className="flex h-[40vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4">{frontmatter.title}</h1>
            {markdownify(content, "div", "content")}
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotFound
