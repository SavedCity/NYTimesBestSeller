import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 10px 20px;
  border-bottom: 1px solid #0002;
  background: #fff;
`;

const LeftHeader = styled.div`
  display: flex;
  align-content: center;
`;

const HamburgerBox = styled.div`
  width: 33px;
  height: 31px;
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
  padding: 6px 9px 4px 9px;
  margin: 0 12px;
  transition: 0.3s;
  white-space: nowrap;
  background: linear-gradient(#282828, #282828) no-repeat 0% 100%;
  background-size: 0% 0.1em;

  &:hover {
    background-size: 100% 0.1em;
  }
`;

export default function Header() {
  const openMenu = () => {
    let menu = document.getElementById("side-menu");
    let top = document.getElementById("ham-top");
    let mid = document.getElementById("ham-mid");
    let bottom = document.getElementById("ham-bottom");
    let booksContainer = document.getElementById("books-category-container");
    let booksArrow = document.getElementById("books-arrow");

    if (!menu.classList.contains("menu-slide")) {
      menu.classList.add("menu-slide");
      top.classList.add("hamburger-top");
      mid.classList.add("hamburger-mid");
      bottom.classList.add("hamburger-bottom");
      mid.classList.remove("hamburger-mid-hover");
    } else {
      menu.classList.remove("menu-slide");
      top.classList.remove("hamburger-top");
      mid.classList.remove("hamburger-mid");
      bottom.classList.remove("hamburger-bottom");
      booksContainer.classList.remove("category-slide");
      booksArrow.classList.remove("arrow-rotate");
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

  window.onclick = function (e) {
    let menu = document.getElementById("side-menu");
    let top = document.getElementById("ham-top");
    let mid = document.getElementById("ham-mid");
    let bottom = document.getElementById("ham-bottom");
    let booksContainer = document.getElementById("books-category-container");
    let booksArrow = document.getElementById("books-arrow");

    if (
      menu.classList.contains("menu-slide") &&
      !e.target.closest("#side-menu") &&
      !e.target.closest("#hamburger-box")
    ) {
      menu.classList.remove("menu-slide");
      top.classList.remove("hamburger-top");
      mid.classList.remove("hamburger-mid");
      bottom.classList.remove("hamburger-bottom");
      booksContainer.classList.remove("category-slide");
      booksArrow.classList.remove("arrow-rotate");
      top.classList.remove("hamburger-top-hover");
      mid.classList.remove("hamburger-mid-hover");
      bottom.classList.remove("hamburger-bottom-hover");
    }
  };

  return (
    <HeaderContainer>
      <LeftHeader>
        <HamburgerBox
          id="hamburger-box"
          onMouseOver={menuHover}
          onMouseLeave={menuLeave}
          onClick={openMenu}
        >
          <HamburgerTop id="ham-top"></HamburgerTop>
          <HamburgerMid id="ham-mid"></HamburgerMid>
          <HamburgerBottom id="ham-bottom"></HamburgerBottom>
        </HamburgerBox>
      </LeftHeader>
      <LinkContainer>
        <HeaderLinks to="/home">HOME</HeaderLinks>
        <HeaderLinks to="/bookcategory">BOOK CATEGORIES</HeaderLinks>
        <HeaderLinks to="/movies">MOVIE REVIEWS</HeaderLinks>
      </LinkContainer>
    </HeaderContainer>
  );
}
