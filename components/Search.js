import React, { useContext } from "react";
import QueryProvider, { QueryContext } from "../context/queryContext";
import { SearchContext } from "../context/searchContext";
import styled from "@emotion/styled";
const SearchWrapper = styled.section`
  display: flex;
  height: 100%;
  justify-self: end;
  @media only screen and (max-width: 500px) {
    /* margin-top: 2rem; */

    margin-left: auto;
    margin-right: auto;
  }
`;
const Icon = styled.i`
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  align-self: center;
`;

const Form = styled.form`
  display: flex;
`;
const Label = styled.label`
  background: #888;
  color: white;
  height: 100%;
  align-self: center;
  padding: 1rem 2rem;
  padding-right: 0.1rem;
  border-radius: 0.2rem 0 0 0.2rem;
  color: white;
  font-family: inherit;
  font-size: 2rem;
`;
const Input = styled.input`
  height: 100%;
  display: flex;
  background: #888;
  border: none;
  align-items: flex-start;
  font-size: 2rem;
  padding: 1rem 2rem;
  padding-left: 0;
  border-radius: 0 0.2rem 0.2rem 0;
  color: white;
  font-family: inherit;
  font-size: 2rem;
`;
export default function Search() {
  const { setInput, input } = useContext(SearchContext);
  const { setQ, q } = useContext(QueryContext);

  return (
    // <form
    //   action=""
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     //Reset state
    //     setQ({
    //       r: [input],
    //       s: "hot",
    //       t: "week",
    //       after: "",
    //       before: "",
    //       count: 0,
    //     });
    //   }}
    // >
    //   <input
    //     type="text"
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //   />
    //   <button>search</button>
    // </form>
    <SearchWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          //Reset state
          setQ({
            r: [input],
            s: "hot",
            t: "week",
            after: "",
            before: "",
            count: 0,
          });
        }}
      >
        <Label>r/</Label>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="subreddit"
        />
      </Form>
      <Icon
        className="fas fa-search fa-2x"
        onClick={() => {
          setInput(input);
        }}
      />
    </SearchWrapper>
  );
}
