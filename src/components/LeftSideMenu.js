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
  padding: 7px 30px;
  margin: 10px 0;
  cursor: pointer;
  position: relative;
  border: 2px solid #0003;
  border-radius: 4px;
  background: #fff;
  transition: 0.2s;

  &:hover {
    border: 2px solid #0007;
  }
`;

const CategoryButtonTitle = styled.div`
  font: 600 1rem barlow;
`;

const Arrow = styled.i`
  position: absolute;
  top: 9px;
  right: 25px;
  font-size: 1rem;
  transition: 0.1s;
`;

export default function LeftSideMenu() {
  const openBooks = () => {
    let booksArrow = document.getElementById("books-arrow");
    let categoryContainer = document.getElementById("books-category-container");

    if (booksArrow.classList.contains("arrow-rotate")) {
      booksArrow.classList.remove("arrow-rotate");
    } else booksArrow.classList.add("arrow-rotate");

    if (!categoryContainer.classList.contains("category-slide")) {
      categoryContainer.classList.add("category-slide");
    } else {
      categoryContainer.classList.remove("category-slide");
    }
  };

  const openMovies = () => {
    let movies = document.getElementById("movies-arrow");
    let categoryContainer = document.getElementById(
      "movies-category-container"
    );

    if (movies.classList.contains("arrow-rotate")) {
      movies.classList.remove("arrow-rotate");
    } else movies.classList.add("arrow-rotate");

    if (!categoryContainer.classList.contains("category-slide")) {
      categoryContainer.classList.add("category-slide");
    } else {
      categoryContainer.classList.remove("category-slide");
    }
  };

  return (
    <SideMenu id="side-menu">
      <CategoryButton onClick={openBooks}>
        <CategoryButtonTitle>BOOKS</CategoryButtonTitle>
        <Arrow className="fas fa-arrow-right" id="books-arrow"></Arrow>
      </CategoryButton>
      <BookCategories />

      <CategoryButton onClick={openMovies}>
        <CategoryButtonTitle>MOVIE REVIEWS</CategoryButtonTitle>
        <Arrow className="fas fa-arrow-right" id="movies-arrow"></Arrow>
      </CategoryButton>
      <MovieCategories />
    </SideMenu>
  );
}
