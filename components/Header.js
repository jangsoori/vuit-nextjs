import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import Search from "./Search";
const StyledHeader = styled.header`
  height: max-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    margin-bottom: 2rem;

    gap: 1rem;
    align-items: flex-start;
    /* height: 9rem; */
    justify-content: center;
  }
`;
const Logo = styled.a`
  font-weight: bold;
  font-size: 2.4rem;
  color: white;
  cursor: pointer;
  width: max-content;
`;

export default function Header() {
  const router = useRouter();
  return (
    <StyledHeader>
      <Logo href="/">lurk.it</Logo>
      <Search />
    </StyledHeader>
  );
}
