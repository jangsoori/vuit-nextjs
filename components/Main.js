import styled from "@emotion/styled";
import React from "react";
import SortFilters from "./SortFilters";
import Posts from "./Posts";
import Loading from "./Loader";
import PaginationBtns from "./PaginationBtns";
const MainWrapper = styled.section`
  /* height: 200vh; */
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Subreddit = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: 500;
  margin-right: 1rem;
`;
export default function Main({ data, isLoading, isFetching }) {
  //Fetch data
  return (
    <MainWrapper>
      <Header>
        <Subreddit>r/placeholder</Subreddit>
        <SortFilters />
      </Header>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Posts
            data={data && data}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </>
      )}
    </MainWrapper>
  );
}
