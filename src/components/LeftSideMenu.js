import React from "react";
import styled from "styled-components";
import BookCategories from "../components/BookCategories";

const SideMenu = styled.div`
  background: #0001;
  /* position: fixed; */
  /* overflow: scroll; */
  width: 370px;
  height: 100%;
  padding: 0 20px;
`;

export default function LeftSideMenu() {
  return (
    <SideMenu>
      <BookCategories />
    </SideMenu>
  );
}
