import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import SortFilters from "./SortFilters";
import Posts from "./Posts";
import Loading from "./Loader";
import Head from "next/head";
import PaginationBtns from "./PaginationBtns";
import Loader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { QueryContext } from "../context/queryContext";
const MainWrapper = styled.section`
  /* height: 200vh; */
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  @media only screen and (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
    p {
      /* align-self: center; */
      margin-bottom: 2rem;
    }
  }
`;

const Subreddit = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 500;
  margin-right: 1rem;
  position: relative;
  font-family: "Quicksand";
  font-weight: bold;
  cursor: default;
  ${({ isMulti, isOpenMulti }) =>
    isMulti &&
    isOpenMulti &&
    css`
      ${"" /* Subreddit names div */}
      div {
        opacity: 1;
        visibility: none;
      }
    `}
`;
const Detail = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.secondary};
  z-index: 2;
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: normal;
  width: 33rem;
  margin-top: 1rem;
  border-radius: 0.2rem;
  opacity: 0;
  visibility: none;
  transition: all 0.2s;
  div p {
    font-weight: 500;
    margin: 0;
  }
  @media only screen and (max-width: 550px) {
    /* left: -50%; */
  }
`;
export default function Main({ data, isLoading, isFetching }) {
  const [subreddits, setSubreddits] = useState([]);
  const [openMulti, setOpenMulti] = useState(false);
  const { q, setQ } = useContext(QueryContext);
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
      return subreddits.map((subreddit, i) => {
        return <span key={i}>r/{subreddit}</span>;
      });
    } else if (subreddits.length > 1) {
      return (
        <>
          <i
            style={{ marginRight: "1rem", cursor: "pointer" }}
            onClick={() => setOpenMulti(!openMulti)}
            className="fas fa-arrow-down"
          ></i>
          <span>Multireddit</span>
        </>
      );
    }
  };
  return (
    <MainWrapper>
      {/* Change website title (add subreddits) */}
      <Head>{data && <title>lurk.it - r/{subreddits.join(", ")}</title>}</Head>
      <Header>
        {/* Render subreddits in multireddit (if it is multireddit) on arrow click */}
        <Subreddit isMulti={subreddits.length > 1} isOpenMulti={openMulti}>
          {subreddits && renderSubbreditNames()}{" "}
          <Detail>
            You are now browsing multiple subreddits:{" "}
            <div>
              {subreddits.map((sub, i) => {
                return (
                  <p key={i}>
                    {sub}{" "}
                    <i
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        // Remove subreddit from multireddit on click
                        setSubreddits((prev) => {
                          return prev.filter((item) => {
                            return item !== sub;
                          });
                        });
                        //Set query to new subreddits (to refetch)
                        setQ({
                          // ...q,
                          r: q.r.filter(
                            (item) => item.toLowerCase() !== sub.toLowerCase()
                          ),
                          s: "hot",
                        });
                      }}
                      className="fas fa-minus-circle"
                    ></i>
                  </p>
                );
              })}{" "}
            </div>
          </Detail>
        </Subreddit>
        <SortFilters />
      </Header>
      {/* Render posts or loading component if still loading items. */}
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
