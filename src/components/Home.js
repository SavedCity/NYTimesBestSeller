import LeftSideMenu from "./LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import Books from "./Books";
import HomeCategories from "./headerComponents/HomePage";
import Header from "./Header";
import React, { useState } from "react";
import HeaderBookCategories from "./headerComponents/HeaderBookCategories";
import MovieCategories from "./movies/Movies";

export default function Home() {
  const [currentButton, setCurrentButton] = useState(
    "Sort By: Rank: High to Low"
  );

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <LeftSideMenu
          currentButton={currentButton}
          setCurrentButton={setCurrentButton}
        />
        <Routes>
          <Route
            path="/bookcategory/:idpage"
            element={
              <Books
                currentButton={currentButton}
                setCurrentButton={setCurrentButton}
              />
            }
          />
          <Route path="/home" element={<HomeCategories />} />
          <Route path="/bookcategory" element={<HeaderBookCategories />} />
          <Route path="/movies" element={<MovieCategories />} />
        </Routes>
      </div>
    </div>
  );
}
