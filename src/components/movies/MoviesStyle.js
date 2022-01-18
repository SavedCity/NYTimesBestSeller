import styled from "styled-components";

export const BackToTop = styled.a`
  width: 50px;
  height: 50px;
  position: fixed;
  right: -40px;
  visibility: hidden;
  opacity: 0;
  bottom: 30px;
  text-decoration: none;
  font: 300 2rem barlow;
  background-color: #0002;
  border-radius: 50%;
  transition: 0.3s;

  &:hover {
    background-color: #0003;
  }

  &:before {
    content: "";
    height: 15px;
    border: solid #555;
    border-width: 2px;
    position: absolute;
    top: 18px;
    left: 23px;
  }

  &:after {
    content: "";
    width: 12px;
    height: 12px;
    border-right: solid #555;
    border-top: solid #555;
    border-width: 4px;
    position: absolute;
    top: 16px;
    left: 17px;
    transform: rotate(-45deg);
  }
`;

export const CardContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 9vw 50px 4.5vw;
  align-items: center;
`;

export const ResultsLength = styled.h3`
  font: 500 1.6rem barlow;
  color: #9f0606;
  max-width: 100px;
  white-space: nowrap;
  margin: 0;
`;

export const MagnifyingGlass = styled.i`
  position: absolute;
  top: 14px;
  left: 12px;
  font-size: 1.6rem;
  color: #6e090b77;
  cursor: text;
`;

export const SearchInput = styled.input`
  width: 150px;
  height: 40px;
  border-radius: 25px;
  border: 2px solid #0003;
  background: transparent;
  padding: 4px 4px 4px 45px;
  font: 400 1.2rem barlow;
  transition: 0.4s;
  position: absolute;
  z-index: 1;

  &:focus {
    outline: none;
    width: 300px;
    border: 2px solid #4b4b4b99;
  }

  &:hover {
    border: 2px solid #4b4b4b99;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 5rem 0 0 0;
  max-width: 8%;
  min-width: 8%;
  padding: 0 1vw 0 4vw;
`;

export const FilterTitle = styled.div`
  font: 1.3rem sen;
  text-align: center;
  background: linear-gradient(#6e090b55, #6e090b55) no-repeat 0% 100%;
  background-size: 10vw 0.1em;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
export const FilterLabel = styled.label`
  font: 400 1.2rem barlow;
  white-space: nowrap;
  padding-left: 35px;
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const FilterInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 0px;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #fff;
  transition: 0.2s;
  border: 2px solid #6e090b77;

  &:after {
    content: "";
    position: absolute;
    opacity: 0;
    visibility: hidden;
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    transition: 0.2s;
  }
`;

export const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 20px 60px;
  justify-content: center;
  width: 90%;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30%;
  padding: 20px;
  border: 2px solid #6e090b33;
  box-shadow: 4px 4px #6e090b33;
  position: relative;
  flex: 1;
  flex-basis: 260px;
`;

export const Title = styled.h1`
  font: 500 1.3rem sen;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #0003;
  padding-bottom: 10px;
  color: #6e090b;
`;

export const Star = styled.div`
  font: 500 1.3rem sen;
  color: #be090b;
  float: right;
  position: absolute;
  cursor: default;
  top: 17px;
  right: 15px;
`;

export const StarToolTip = styled.div`
  font: 500 1.1rem sen;
  color: #fff;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  width: 170px;
  background-color: #333;
  z-index: 1;
  top: -75px;
  left: -75px;
  padding: 10px;
  text-align: center;
  border-radius: 2px;
  transition: 0.3s;
  line-height: 24px;

  &:before {
    content: "";
    width: 13px;
    height: 13px;
    border: solid #333;
    background-color: #333;
    transform: rotate(53deg) skew(20deg);
    position: absolute;
    bottom: -3px;
    left: 76px;
    z-index: -1;
  }
`;

export const Rating = styled.h4`
  font: 500 1rem barlow;
  margin: 0;
  color: #0009;
`;

export const Date = styled.h5`
  font: 500 1rem barlow;
  color: #0009;
`;

export const Snapshot = styled.h4`
  font: 500 1rem barlow;
  margin: 0 0 8px 0;
  color: #0009;
`;

export const MovieSnapshot = styled.img`
  border-radius: 2px;
  margin-bottom: 40px;
  width: 100%;
`;

export const DescriptionButton = styled.h4`
  margin: 3px 0 0 0;
  cursor: pointer;
  background: #0001;
  text-align: center;
  border-radius: 3px;
  padding: 5px 8px 8px 8px;
  font: 500 1rem barlow;
  transition: 0.3s;

  &:hover {
    background: #6e090b33;
  }
`;

export const Summary = styled.h5`
  font: 500 1.15rem barlow;
  letter-spacing: 0.4px;
  word-spacing: 2px;
`;

export const SummaryBox = styled.div`
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  position: absolute;
  top: 4px;
  left: 4px;
  height: 0%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.3s, height 0.4s;
  transition-timing-function: ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Pagination
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  margin: 50px 0;
`;

export const PaginateBtn = styled.button`
  padding: 7px 13px;
  background: #6e090b33;
  color: #622828;
  font: 600 0.9rem barlow;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid #0003;
  margin: 0 10px;
  white-space: nowrap;
  /* max-width: 0px; */
  transition: 0.3s;
  height: 30px;

  &:hover {
    background: #6e090b22;
    /* color: #fff; */
    border: 1px solid #0005;
  }
`;

export const GrayedOutBtn = styled.button`
  padding: 7px 13px;
  background: #6e090b11;
  color: #62282899;
  font: 600 0.9rem barlow;
  letter-spacing: 1px;
  border-radius: 3px;
  border: 1px solid #0003;
  margin: 0 15px;
  transition: 0.3s;
  height: 30px;
`;
