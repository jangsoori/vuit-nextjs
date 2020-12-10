import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { QueryContext } from "../context/queryContext";
import useWindowSize from "../hooks/useWindowSize";
const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 10px;
  gap: 0 10px;
  /* justify-items: flex-start; */
  width: 100%;
  height: 100%;
`;

export default function Posts({ data, isFetching, isLoading }) {
  const { q, setQ } = useContext(QueryContext);
  const [cols, setCols] = useState(0);
  const { width } = useWindowSize();
  useEffect(() => {
    if (width < 400) {
      setCols(1);
    } else if (width < 700) {
      setCols(3);
    } else if (width < 900) {
      setCols(4);
    } else if (width < 1200) {
      setCols(5);
    } else if (width < 1800) {
      setCols(6);
    }
  }, [width]);
  const posts = data?.data.data.children.map((post) => {
    return (
      <Post
        key={post.data.id}
        post={post.data}
        style={{ width: "100%", display: "block" }}
      />
    );
  });

  return <Grid>{posts}</Grid>;

  //   <>
  //     <button
  //       disabled={isFetching}
  //       onClick={() => {
  //         setQ({
  //           ...q,
  //           before: "",
  //           after: data?.nextPage,
  //           //!Magic
  //           //Due to reddit API and cursor pagination, I had to look at URL in order to determine "count" from the API which is needed to paginate. If there is "after" parameter, or there is nothing at all (after or before), add 25 to count. If there is "before", substract 1. if count is 1, reset it to 0 to start paginating correctly from the beginning. Else, substract 26. It ensures correct list of posts.
  //           count:
  //             query.after || (!query.after && !query.before)
  //               ? q.count + 25
  //               : query.before
  //               ? q.count - 1
  //               : q.count === 1
  //               ? q.count - 1
  //               : q.count - 26,
  //         });
  //       }}
  //     >
  //       next
  //     </button>
  //     <button
  //       //Count = 26 is first page (after paginating back. That's how reddit API works... my brain!)
  //       disabled={q.count === 26 || isFetching}
  //       onClick={() => {
  //         setQ({
  //           ...q,
  //           after: "",
  //           before: data?.prevPage,

  //           //!Magic
  //           //Due to reddit API and cursor pagination, I had to look at URL in order to determine "count" from the API which is needed to paginate. If there is NOT "before" parameter, add one to Count. If there is, substract 25 from it. It ensures correct list of posts.
  //           count: !query.before ? q.count + 1 : q.count - 25,
  //         });
  //       }}
  //     >
  //       prev
  //     </button>
  //   </>
  // )
}
