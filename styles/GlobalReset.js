import { css, Global } from "@emotion/react";

export default function GlobalReset() {
  return (
    <Global
      styles={css`
        /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        ul {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: inherit;
        }

        html {
          font-size: 62.5%;
          line-height: 1.2;
          font-family: "Quicksand";
        }
        html,
        body,
        #__next {
          height: 100%;
        }
        body {
          background: rgb(23, 23, 23);
        }
      `}
    />
  );
}
