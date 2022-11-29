// "use client";
// import Header from "@layouts/partials/Header";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import config from "@config/config.json";
import { JsonContext } from "context/state";
import "styles/style.scss";
import { Providers } from "@layouts/components/Provider";
import { Roboto } from "@next/font/google";
import GTM from "./GTM";
// const inter = Nerko_One({
//   weight: ["400"],
// });
const inter = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});
// eslint-disable-next-line react-hooks/exhaustive-deps

// import google font css

export default async function RootLayout({ children }) {
  const { favicon } = config.site;
  return (
    <html className={inter.className}>
      <head title="nxt boilerplate">
        {/* favicon */}
        <link rel="shortcut icon" href={favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="next-boilerplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>

      <body>
        <GTM />
        <JsonContext>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </JsonContext>
      </body>
    </html>
  );
}
