import GlobalReset from "../styles/GlobalReset";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { ReactQueryCacheProvider, QueryCache } from "react-query";
import SearchProvider from "../context/searchContext";
import { Hydrate } from "react-query/hydration";
import "../components/Posts.css";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

import styled from "@emotion/styled";
import QueryProvider from "../context/queryContext";
import Head from "next/head";
const StyledApp = styled.div`
  font-family: "Quicksand";
  background: ${({ theme }) => theme.colors.primary};
  height: 100%;

  padding: 2rem;
`;
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>lurk.it - Just reddit content</title>
      </Head>
      <GlobalReset />
      <ThemeProvider theme={theme}>
        <StyledApp>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <Hydrate state={pageProps.dehydratedState}>
              <SearchProvider>
                <QueryProvider>
                  <Component {...pageProps} />
                </QueryProvider>
              </SearchProvider>
            </Hydrate>
          </ReactQueryCacheProvider>
        </StyledApp>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
