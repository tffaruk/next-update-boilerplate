// import Header from "@layouts/partials/Header";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import config from "@config/config.json";
import { JsonContext } from "context/state";
import "styles/style.scss";
import { Providers } from "@layouts/components/Provider";
export default function RootLayout({ children }) {
  const { favicon } = config.site;
  return (
    <html>
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
