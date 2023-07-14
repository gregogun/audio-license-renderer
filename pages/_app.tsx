import { globalCss } from "@/stitches.config";
import type { AppProps } from "next/app";

const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "inherit",
  },
  "*": {
    "*:focus:not(.focus-visible)": {
      outline: "none",
    },
  },
  "html, body, #root, #__next": {
    height: "100%",
    fontFamily: "$body",
    margin: 0,
    backgroundColor: "inherit",
  },

  "#__next": {
    position: "relative",
    zIndex: 0,
  },
  a: {
    textDecoration: "none",
  },
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
