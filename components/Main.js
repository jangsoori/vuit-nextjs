import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import SortFilters from "./SortFilters";
import Posts from "./Posts";
import Loading from "./Loader";
import PaginationBtns from "./PaginationBtns";
import Loader from "react-spinners/ClipLoader";
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
  position: relative;
  font-family: "Quicksand";
  font-weight: bold;
`;
export default function Main({ data, isLoading, isFetching }) {
  const [subreddits, setSubreddits] = useState([]);
  useEffect(() => {
    const subNames = [
      ...new Set(
        data?.data?.data?.children.map((child) => {
          return child.data.subreddit;
        })
      ),
    ];
    setSubreddits(subNames);
    return () => {
      setSubreddits([]);
    };
  }, [data]);

  const renderSubbreditNames = () => {
    if (subreddits.length === 1) {
      return subreddits.map((subreddit) => {
        return <span>r/{subreddit}</span>;
      });
    } else if (subreddits.length > 1) {
      return <span>Multireddit</span>;
    }
  };
  return (
    <MainWrapper>
      <Header>
        <Subreddit>{subreddits && renderSubbreditNames()}</Subreddit>
        <SortFilters />
      </Header>
      {isFetching ? (
        <Loading size={50} />
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
