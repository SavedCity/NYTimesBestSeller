import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Logo from "../images/nytimes-blue.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #0002;
`;

const LinkContainer = styled.div`
  display: flex;
`;

const HeaderLinks = styled(Link)`
  text-decoration: none;
  color: #000;
  font-family: sen;
  font-size: 1rem;
  line-height: 1.8;
  padding: 4px 9px;
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
  return (
    <HeaderContainer>
      <ImgLogo src={Logo} />
      <LinkContainer>
        <HeaderLinks to="/homecategory">HOME</HeaderLinks>
        <HeaderLinks to="/homecategory">BOOK CATEGORIES</HeaderLinks>
      </LinkContainer>
    </HeaderContainer>
  );
}
