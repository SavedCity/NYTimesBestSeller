import React from "react";
import LeftSideMenu from "./LeftSideMenu";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IdPage from "./idpage";

const MainPage = styled.div`
  display: flex;
`;

export default function Home() {
  return (
    <MainPage>
      <LeftSideMenu />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/:idpage" element={<IdPage />} />
      </Routes>
    </MainPage>
  );
}
