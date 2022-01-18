import LeftSideMenu from "./LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import IdPage from "./Books";
import HomeCategories from "./headerComponents/HomePage";
import Header from "./Header";
import React from "react";
import HeaderBookCategories from "./headerComponents/HeaderBookCategories";
import MovieCategories from "./Movies";

export default function Home() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <LeftSideMenu />
        <Routes>
          <Route path="/bookcategory/:idpage" element={<IdPage />} />
          <Route path="/" element={<HomeCategories />} />
          <Route path="/bookcategory" element={<HeaderBookCategories />} />
          <Route path="/movies" element={<MovieCategories />} />
        </Routes>
      </div>
    </div>
  );
}
