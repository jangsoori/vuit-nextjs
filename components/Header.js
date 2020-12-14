import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import Search from "./Search";
const StyledHeader = styled.header`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;
const Logo = styled.a`
  font-weight: bold;
  font-size: 2.4rem;
  color: white;
  cursor: pointer;
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
