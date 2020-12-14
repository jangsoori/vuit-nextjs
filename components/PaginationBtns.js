import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { QueryContext } from "../context/queryContext";

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;
const Arrow = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 5rem;
  background: white;
  width: 6rem;
  height: 6rem;
  color: black;
  border-radius: 50%;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
  z-index: 10;
  &:first-of-type {
    right: 45%;
  }
  &:last-of-type {
    left: 45%;
  }
  > * {
    cursor: pointer;
    background: none;
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default function PaginationBtns({ data, isFetching }) {
  const { q, setQ } = useContext(QueryContext);
  const { query } = useRouter();
  return (
    <Wrapper>
      <Arrow
        onClick={() => {
          setQ({
            ...q,
            before: "",
            after: data?.nextPage,
            //!Magic
            //Due to reddit API and cursor pagination, I had to look at URL in order to determine "count" from the API which is needed to paginate. If there is "after" parameter, or there is nothing at all (after or before), add 25 to count. If there is "before", substract 1. if count is 1, reset it to 0 to start paginating correctly from the beginning. Else, substract 26. It ensures correct list of posts.
            count:
              query.after || (!query.after && !query.before)
                ? q.count + 25
                : query.before
                ? q.count - 1
                : q.count === 1
                ? q.count - 1
                : q.count - 26,
          });
        }}
      >
        <button
          disabled={isFetching}
          className="fas fa-arrow-right fa-4x"
        ></button>
      </Arrow>
      <Arrow
        onClick={() => {
          setQ({
            ...q,
            after: "",
            before: data?.prevPage,

            //!Magic
            //Due to reddit API and cursor pagination, I had to look at URL in order to determine "count" from the API which is needed to paginate. If there is NOT "before" parameter, add one to Count. If there is, substract 25 from it. It ensures correct list of posts.
            count: !query.before ? q.count + 1 : q.count - 25,
          });
        }}
      >
        <button //Count = 26 is first page (after paginating back. That's how reddit API works... my brain!)
          disabled={q.count === 26 || isFetching || !q.after}
          className="fas fa-arrow-left fa-4x"
        ></button>
      </Arrow>
    </Wrapper>
  );
}
