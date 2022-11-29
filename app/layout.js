import Footer from "@partials/Footer";
import Header from "@partials/Header";
import config from "@config/config.json";
import { JsonContext } from "context/state";
import "styles/style.scss";
import ThemeProviders from "app/ThemeProviders";
import { Roboto } from "@next/font/google";
import GTM from "./GTM";

const font = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export default async function RootLayout({ children }) {
  const { favicon } = config.site;
  return (
    <html className={font.className}>
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
          <ThemeProviders>
            <Header />
            {children}
            <Footer />
          </ThemeProviders>
        </JsonContext>
      </body>
    </html>
  );
}
