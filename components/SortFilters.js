import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { QueryContext } from "../context/queryContext";
import { SearchContext } from "../context/searchContext";
const Filters = styled.section`
  display: grid;
  grid-auto-flow: column;

  gap: 1rem;
  align-items: center;
`;
const Sort = styled.ul`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
  align-content: center;
`;
const SortText = styled.p`
  color: white;
  font-size: 1.6rem;
`;
const Period = styled.select`
  display: block;
  font-size: 16px;
  font-family: "Quicksand";
  font-weight: 500;
  color: white;
  line-height: 1;
  padding: 0.4rem 2rem;
  padding-left: 0;
  width: 100%;
  max-width: 100%; /* useful when width is set to anything other than 100% */
  box-sizing: border-box;
  margin: 0;
  border: none;
  padding-left: 0.2rem;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: ${({ theme }) => theme.colors.secondary};

  background-image: url("/arrow-down.svg");
  background-repeat: no-repeat, repeat;
  /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
  background-position: right 0.3rem top 50%, 0 0;
  /* icon size, then gradient */
  /* background-size: 0.65em auto, 100%; */
  /* Hide arrow icon in IE browsers */
  &::-ms-expand {
    display: none;
  }
  :hover {
    /* border-color: #888; */
  }
  :focus {
    /* border-color: #555; */
    /* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
    color: white;
    outline: none;
  }
  option {
    font-weight: normal;
    width: 100%;
    border: black;
    font-family: "Quicksand";
  }
  @media only screen and (max-width: 500px) {
    grid-row: 2/3;
  }
`;
const Filter = styled.li`
  text-align: center;
  padding: 0.25rem 0.5rem;
  /* background: #888; */
  color: white;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;
  transition: 0.2s all;
  &::first-letter {
    text-transform: uppercase;
  }

  &:hover {
    background: white;
    color: black;
  }
  ${({ selected }) =>
    selected &&
    css`
      background: white;
      color: black;
    `}
`;
export default function SortFilters() {
  const { q, setQ } = useContext(QueryContext);
  const filters = ["hot", "top", "new", "rising", "controversial"];

  const { query } = useRouter();
  const renderFilters = () => {
    return filters.map((filter, i) => (
      <Filter
        key={Math.random()}
        selected={query.s === filter}
        onClick={() => {
          setQ({ ...q, t: "week", s: filter, after: "", before: "", count: 0 });
        }}
      >
        {filter}
      </Filter>
    ));
  };

  return (
    <Filters>
      <Sort>{renderFilters()}</Sort>
      {(query.s === "top" || query.s === "controversial") && (
        <>
          {/* <SortText>Time period</SortText> */}
          <Period
            onChange={(e) => setQ({ ...q, t: e.target.value })}
            value={query.t}
          >
            <option value="hour">Last hour</option>
            <option value="day">Last day</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
            <option value="year">Last year</option>
            <option value="all">All time</option>
          </Period>
        </>
      )}
    </Filters>
  );
}
