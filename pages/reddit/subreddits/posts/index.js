import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import { QueryCache, usePaginatedQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Header from "../../../../components/Header";
import { QueryContext } from "../../../../context/queryContext";
import Main from "../../../../components/Main";
import PaginationBtns from "../../../../components/PaginationBtns";
const queryPosts = async (
  key,
  sort,
  input,
  periodForTop,
  nextPage = "",
  prevPage = "",

  count
) => {
  const getInput = input ? input : "earthporn";
  const getPeriod =
    sort === "top" || sort === "controversial" ? `t=${periodForTop}` : "";
  const getNextPage =
    nextPage && !prevPage ? `&after=${nextPage}&count=${count}` : "";
  const getPrevPage =
    prevPage && !nextPage ? `&before=${prevPage}&count=${count}` : "";

  const { data } = await Axios.get(
    `https://www.reddit.com/r/${getInput}/${
      sort || "hot"
    }.json?${getPeriod}${getNextPage}${getPrevPage}`
  );
  return {
    data: data,
    nextPage: data.data.after,
    prevPage: data.data.before,
  };
};

export default function index(props) {
  const { push } = useRouter();
  const { q } = useContext(QueryContext);

  //Every time query state changes, put it in the URL
  useEffect(() => {
    push(
      `?r=${q.r.join("+")}&s=${q.s}${
        q.s === "top" || q.s === "controversial" ? `&t=${q.t}` : ""
      }${q.after && !q.before ? `&after=${q.after}` : ""}${
        q.before && !q.after ? `&before=${q.before}` : ""
      }${q.after || q.before ? `&count=${q.count}` : ""}`,
      undefined,
      { shallow: true }
    );
  }, [q.r, q.s, q.t, q.after, q.before, q.count]);

  const {
    resolvedData: data,
    isFetching,
    isLoading,
    isFetchingMore,
  } = usePaginatedQuery(
    ["posts", q.s, q.r.join("+"), q.t, q.after, q.before, q.count],
    queryPosts
  );

  return (
    <>
      <Header />
      <Main data={data && data} isLoading={isLoading} isFetching={isFetching} />
      <PaginationBtns data={data && data} isFetching={isFetching} />
    </>
  );
}

export async function getServerSideProps(context) {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery("posts", queryPosts);
  return {
    props: {
      dehydratedState: dehydrate(queryCache),
      query: context.query,
    },
  };
}
