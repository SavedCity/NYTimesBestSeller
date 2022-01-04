import React from "react";
import styled from "styled-components";
import BookCategories from "../components/BookCategories";
import { Link } from "react-router-dom";

const SideMenu = styled.div`
  background: #fafafa;
  min-width: 370px;
  max-width: 370px;
  min-height: 100vw;
  padding: 10px 20px;
  position: absolute;
  left: -450px;
  transition: 0.2s;
  z-index: 1;
  border-right: 1px solid #0003;
`;

const CategoryButton = styled.div`
  padding: 12px 30px 12px 15px;
  margin: -5px 0;
  cursor: pointer;
  position: relative;
  border: 1px solid #0003;
  border-radius: 4px;
  background: #fff;
  transition: 0.2s;
  font: 500 1rem barlow;

  &:hover {
    border: 1px solid #0007;
  }
`;

const CategoryButtonTitle = styled.div`
  font: 500 1rem barlow;
  letter-spacing: 1px;
`;

const Arrow = styled.i`
  position: absolute;
  top: 14px;
  right: 25px;
  font-size: 1rem;
  transition: 0.1s;
`;

const MovieLInk = styled(Link)`
  text-decoration: none;
  letter-spacing: 1px;
  color: #000;
`;

export default function LeftSideMenu() {
  const openBooks = () => {
    let booksArrow = document.getElementById("books-arrow");
    let booksContainer = document.getElementById("books-category-container");

    if (booksArrow.classList.contains("arrow-rotate")) {
      booksArrow.classList.remove("arrow-rotate");
    } else booksArrow.classList.add("arrow-rotate");

    if (!booksContainer.classList.contains("category-slide")) {
      booksContainer.classList.add("category-slide");
    } else {
      booksContainer.classList.remove("category-slide");
    }
  };

  return (
    <SideMenu id="side-menu">
      <CategoryButton onClick={openBooks}>
        <CategoryButtonTitle>BOOK CATEGORIES</CategoryButtonTitle>
        <Arrow className="fas fa-arrow-right" id="books-arrow"></Arrow>
      </CategoryButton>

      <BookCategories />
      <MovieLInk to="/movies">
        <CategoryButton>MOVIE REVIEWS</CategoryButton>
      </MovieLInk>
    </SideMenu>
  );
}
