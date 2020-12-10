import React, { useContext } from "react";
import QueryProvider, { QueryContext } from "../context/queryContext";
import { SearchContext } from "../context/searchContext";
import styled from "@emotion/styled";
const SearchWrapper = styled.section`
  display: flex;
  height: 100%;
`;
const Icon = styled.i`
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  align-self: center;
`;

const Form = styled.form`
  display: flex;
  line-height: 1;
`;
const Label = styled.label`
  background: #888;
  color: white;
  padding: 1rem 2rem;
  padding-right: 0;
  border-radius: 0.5rem 0 0 0.5rem;
  color: white;
  font-family: inherit;
  font-size: 2rem;
`;
const Input = styled.input`
  height: 100%;
  display: block;
  align-self: stretch;
  background: #888;
  border: none;
  padding: 1rem 2rem;
  padding-left: 0;
  border-radius: 0 0.5rem 0.5rem 0;
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
