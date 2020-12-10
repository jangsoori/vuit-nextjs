import styled from "@emotion/styled";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Wrapper = styled.section`
  position: absolute;
  left: 50%;
`;
export default function Loading() {
  return (
    <Wrapper>
      <ClipLoader size={50} color={"white"} loading={true} />
    </Wrapper>
  );
}
