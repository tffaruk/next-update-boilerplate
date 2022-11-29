"use client";
import { ThemeProvider } from "next-themes";
import config from "@config/config.json";

const ThemeProviders=({ children })=> {
  const { default_theme } = config.settings;
  return (
    <ThemeProvider attribute="class" defaultTheme={default_theme}>
      {children}
    </ThemeProvider>
  );
}
export default ThemeProviders