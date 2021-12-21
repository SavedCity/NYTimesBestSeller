import React from "react";
import styled from "styled-components";
import BookCategories from "../components/BookCategories";
import MovieCategories from "../components/MovieCategories";

const SideMenu = styled.div`
  background: #eee;
  min-width: 370px;
  min-height: 100%;
  padding: 10px 20px;
  position: absolute;
  left: -450px;
  transition: 0.2s;
  z-index: 1;
`;

const CategoryButton = styled.div`
  font: 600 1.3rem barlow;
  padding: 7px 30px;
  margin: 0 0 20px 0;
  cursor: pointer;
  position: relative;
  border: 1px solid;
  border-radius: 3px;
  background: #fff;
`;

const CategoryButtonTitle = styled.div`
  font: 600 1.2rem barlow;
`;

const Arrow = styled.i`
  position: absolute;
  top: 9px;
  right: 25px;
  font-size: 1.2rem;
  transition: 0.1s;
`;

export default function LeftSideMenu() {
  const openBooks = () => {
    let books = document.getElementById("books-arrow");
    let categories = document.getElementById("book-categories");

    if (books.classList.contains("arrow-rotate")) {
      books.classList.remove("arrow-rotate");
    } else books.classList.add("arrow-rotate");

    if (categories.style.display === "none") {
      categories.style.display = "block";
    } else {
      categories.style.display = "none";
    }
  };

  const openMovies = () => {
    let movies = document.getElementById("movies-arrow");
    let categories = document.getElementById("movie-categories");

    if (movies.classList.contains("arrow-rotate")) {
      movies.classList.remove("arrow-rotate");
    } else movies.classList.add("arrow-rotate");

    if (categories.style.display === "none") {
      categories.style.display = "block";
    } else {
      categories.style.display = "none";
    }
  };

  return (
    <SideMenu id="side-menu">
      <CategoryButton onClick={openBooks}>
        <CategoryButtonTitle>BOOKS</CategoryButtonTitle>
        <Arrow className="fas fa-arrow-right" id="books-arrow"></Arrow>
      </CategoryButton>
      <div id="book-categories" style={{ display: "none" }}>
        <BookCategories />
      </div>

      <CategoryButton onClick={openMovies}>
        <CategoryButtonTitle>MOVIE REVIEWS</CategoryButtonTitle>
        <Arrow className="fas fa-arrow-right" id="movies-arrow"></Arrow>
      </CategoryButton>
      <div id="movie-categories" style={{ display: "none" }}>
        <MovieCategories />
      </div>
    </SideMenu>
  );
}
