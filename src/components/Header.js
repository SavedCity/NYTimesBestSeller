import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import React from "react";
// import Logo from "../images/nytimes-blue.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 10px 20px;
  /* margin-bottom: 20px; */
  border-bottom: 1px solid #0002;
`;

const LeftHeader = styled.div`
  display: flex;
  align-content: center;
`;

const HamburgerBox = styled.div`
  width: 30px;
  height: 31px;
  /* background: #0001; */
  position: relative;
  margin: 0 30px 0 10px;
  cursor: pointer;
`;

const HamburgerTop = styled.div`
  width: 33px;
  height: 3px;
  background: #444;
  position: absolute;
  top: 5px;
  transition: 0.2s;

  &:hover {
    width: 26px;
  }
`;

const HamburgerMid = styled.div`
  width: 26px;
  height: 3px;
  background: #444;
  position: absolute;
  top: 13.5px;
  transition: 0.1s;
`;

const HamburgerBottom = styled.div`
  width: 33px;
  height: 3px;
  background: #444;
  position: absolute;
  bottom: 5px;
  transition: 0.2s;
`;

const LinkContainer = styled.div`
  display: flex;
`;

const HeaderLinks = styled(Link)`
  text-decoration: none;
  color: #000;
  font-family: sen;
  font-size: 1rem;
  /* line-height: 1.8; */
  padding: 6px 9px 4px 9px;
  border-radius: 3px;
  transition: 0.2s;
  margin: 0 12px;
`;

// const ImgLogo = styled.img`
//   width: 180px;
// `;

export default function Header() {
  const openMenu = () => {
    let menu = document.getElementById("side-menu");
    let top = document.getElementById("ham-top");
    let mid = document.getElementById("ham-mid");
    let bottom = document.getElementById("ham-bottom");
    let booksContainer = document.getElementById("books-category-container");
    let booksArrow = document.getElementById("books-arrow");
    // let moviesContainer = document.getElementById("movies-category-container");
    // let moviesArrow = document.getElementById("movies-arrow");

    if (!menu.classList.contains("menu-slide")) {
      // menu.style.display = "block";
      menu.classList.add("menu-slide");
      top.classList.add("hamburger-top");
      mid.classList.add("hamburger-mid");
      bottom.classList.add("hamburger-bottom");
      mid.classList.remove("hamburger-mid-hover");
    } else {
      // menu.style.display = "none";
      menu.classList.remove("menu-slide");
      top.classList.remove("hamburger-top");
      mid.classList.remove("hamburger-mid");
      bottom.classList.remove("hamburger-bottom");
      booksContainer.classList.remove("category-slide");
      booksArrow.classList.remove("arrow-rotate");
      // moviesContainer.classList.remove("category-slide");
      // moviesArrow.classList.remove("arrow-rotate");
    }
  };

  const menuHover = () => {
    let menu = document.getElementById("side-menu");
    let top = document.getElementById("ham-top");
    let mid = document.getElementById("ham-mid");
    let bottom = document.getElementById("ham-bottom");

    if (!menu.classList.contains("menu-slide")) {
      top.classList.add("hamburger-top-hover");
      mid.classList.add("hamburger-mid-hover");
      bottom.classList.add("hamburger-bottom-hover");
    }
  };

  const menuLeave = () => {
    let menu = document.getElementById("side-menu");
    let top = document.getElementById("ham-top");
    let mid = document.getElementById("ham-mid");
    let bottom = document.getElementById("ham-bottom");

    if (!menu.classList.contains("menu-slide")) {
      top.classList.remove("hamburger-top-hover");
      mid.classList.remove("hamburger-mid-hover");
      bottom.classList.remove("hamburger-bottom-hover");
    }
  };

  return (
    <HeaderContainer>
      <LeftHeader>
        <HamburgerBox
          onMouseOver={menuHover}
          onMouseLeave={menuLeave}
          onClick={openMenu}
        >
          <HamburgerTop id="ham-top"></HamburgerTop>
          <HamburgerMid id="ham-mid"></HamburgerMid>
          <HamburgerBottom id="ham-bottom"></HamburgerBottom>
        </HamburgerBox>
        {/* <ImgLogo src={Logo} /> */}
      </LeftHeader>
      <LinkContainer>
        <HeaderLinks to="/homecategory">HOME</HeaderLinks>
        <HeaderLinks to="/bookcategory">BOOK CATEGORIES</HeaderLinks>
      </LinkContainer>
    </HeaderContainer>
  );
}
