import config from "@config/config.json";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify } from "@lib/utils/textConverter";
import Head from "app/head";
import Link from "next/link";

const Tags = () => {
  const { blog_folder } = config.settings;
  const tags = getTaxonomy(`content/${blog_folder}`, "tags");
  return (
    <>
      <Head title={"tags"} />
      <section className="section">
        <div className="container text-center">
          {markdownify("Tags", "h1", "h2 mb-16")}
          <ul className="space-x-4">
            {tags.map((category, i) => (
              <li key={`category-${i}`} className="inline-block">
                <Link
                  href={`/tags/${category}`}
                  className="rounded-lg bg-light px-4 py-2 text-dark transition hover:bg-primary hover:text-white"
                >
                  &#8226; {humanize(category)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Tags;
