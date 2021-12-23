import LeftSideMenu from "./LeftSideMenu";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import IdPage from "./idpage";
import HomeCategories from "./HomeCategories";
import Header from "./Header";
import React from "react";

const MainPage = styled.div`
  display: flex;
`;

export default function Home() {
  return (
    <div>
      <Header />
      <MainPage>
        <LeftSideMenu />
        <Routes>
          <Route path="/:idpage" element={<IdPage />} />
          <Route path="/homecategory" element={<HomeCategories />} />
        </Routes>
      </MainPage>
    </div>
  );
}
