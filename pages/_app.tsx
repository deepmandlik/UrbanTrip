import type { AppProps } from "next/app";
import { Global, css } from "@emotion/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <Component {...pageProps} />{" "}
    </>
  );
}

export default MyApp;
