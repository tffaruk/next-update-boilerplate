import config from "@config/config.json";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import Head from "./head";
const { blog_folder } = config.settings;

const page = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const authors = getSinglePage("content/authors");
  const sortPostByDate = sortByDate(posts);
  const showPost = 4;

  return (
    <>
      <Head title="Next Boilerplate" />
      <div>
        <div className="section">
          <div className="container">
            {markdownify(banner.title, "h1", "h2 mb-8 text-center")}
            <Posts
              posts={sortPostByDate.slice(0, showPost)}
              authors={authors}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

// import config from "@config/config.json";
// import Base from "@layouts/Baseof";
// import { getListPage, getSinglePage } from "@lib/contentParser";
// import { sortByDate } from "@lib/utils/sortFunctions";
// import { markdownify } from "@lib/utils/textConverter";
// import Posts from "@partials/Posts";
// const { blog_folder } = config.settings;

// const Home = ({ banner, posts, authors }) => {
//   const sortPostByDate = sortByDate(posts);
//   const showPost = 4;

//   return (
//     <Base>
//       <div className="section">
//         <div className="container">
//           {markdownify(banner.title, "h1", "h2 mb-8 text-center")}
//           <Posts posts={sortPostByDate.slice(0, showPost)} authors={authors} />
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default Home;

// // for homepage data
// export const getStaticProps = async () => {
//   const homepage = await getListPage("content/_index.md");
//   const { frontmatter } = homepage;
//   const { banner } = frontmatter;
//   const posts = getSinglePage(`content/${blog_folder}`);
//   const authors = getSinglePage("content/authors");

//   return {
//     props: {
//       banner: banner,
//       posts: posts,
//       authors: authors,
//     },
//   };
// };
