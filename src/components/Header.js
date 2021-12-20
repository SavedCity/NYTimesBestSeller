import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Logo from "../images/nytimes-blue.png";

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
  width: 40px;
  height: 40px;
  /* background: #0001; */
  position: relative;
  margin: 0 30px 0 10px;
  cursor: pointer;
`;

const HamburgerTop = styled.div`
  width: 40px;
  height: 3px;
  background: #444;
  position: absolute;
  top: 5px;
  transition: 0.2s;
`;

const HamburgerMid = styled.div`
  width: 30px;
  height: 3px;
  background: #444;
  position: absolute;
  top: 18px;
  transition: 0.1s;
`;

const HamburgerBottom = styled.div`
  width: 40px;
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
  padding: 10px 9px 4px 9px;
  border-radius: 3px;
  transition: 0.2s;
  margin: 0 12px;

  &:hover {
    background: #0001;
  }
`;

const ImgLogo = styled.img`
  width: 180px;
`;

export default function Header() {
  const openMenu = () => {
    let menu = document.getElementById("side-menu");
    let top = document.getElementById("ham-top");
    let mid = document.getElementById("ham-mid");
    let bottom = document.getElementById("ham-bottom");
    let bookCategories = document.getElementById("book-categories");
    let booksArrow = document.getElementById("books-arrow");
    let movieCategories = document.getElementById("movie-categories");
    let moviesArrow = document.getElementById("movies-arrow");

    if (menu.style.display === "none") {
      menu.style.display = "block";
      top.classList.add("hamburger-top");
      mid.classList.add("hamburger-mid");
      bottom.classList.add("hamburger-bottom");
    } else {
      menu.style.display = "none";
      top.classList.remove("hamburger-top");
      mid.classList.remove("hamburger-mid");
      bottom.classList.remove("hamburger-bottom");
      bookCategories.style.display = "none";
      booksArrow.classList.remove("arrow-rotate");
      movieCategories.style.display = "none";
      moviesArrow.classList.remove("arrow-rotate");
    }
  };

  return (
    <HeaderContainer>
      <LeftHeader>
        {/* <Menu onClick={openMenu}>MENU</Menu> */}
        <HamburgerBox onClick={openMenu}>
          <HamburgerTop id="ham-top"></HamburgerTop>
          <HamburgerMid id="ham-mid"></HamburgerMid>
          <HamburgerBottom id="ham-bottom"></HamburgerBottom>
        </HamburgerBox>
        {/* <ImgLogo src={Logo} /> */}
      </LeftHeader>
      <LinkContainer>
        <HeaderLinks to="/homecategory">HOME</HeaderLinks>
        <HeaderLinks to="/homecategory">BOOK CATEGORIES</HeaderLinks>
      </LinkContainer>
    </HeaderContainer>
  );
}
