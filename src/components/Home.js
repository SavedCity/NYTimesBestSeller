import LeftSideMenu from "./LeftSideMenu";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import IdPage from "./idpage";
import HomeCategories from "./headerComponents/HomeCategories";
import Header from "./Header";
import React from "react";
import HeaderBookCategories from "./headerComponents/HeaderBookCategories";

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
          <Route path="/bookcategory/:idpage" element={<IdPage />} />
          <Route path="/homecategory" element={<HomeCategories />} />
          <Route path="/bookcategory" element={<HeaderBookCategories />} />
        </Routes>
      </MainPage>
    </div>
  );
}
