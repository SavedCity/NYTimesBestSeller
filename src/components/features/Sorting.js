import React from "react";
import styled from "styled-components";

const SortingContainer = styled.div`
  position: absolute;
  background: #fff;
  top: 36px;
  left: 0;
  z-index: 1;
  width: 198px;
  border: 1px solid transparent;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: 0.3s;
  max-height: 0;
  overflow-y: hidden;
`;

const SortingOpener = styled.button`
  border: 2px solid #03045e33;
  font: 500 1rem barlow;
  padding: 5px 40px 8px 40px;
  cursor: pointer;
  background: #fff;
  border-radius: 3px;
  width: 100%;
  transition: 0.2s;

  &:hover {
    background: #7161ef;
    color: #fff;
  }
`;

const SortingDropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const SortingButton = styled.button`
  margin: 5px 0;
  padding: 5px 10px;
  font: 500 1rem barlow;
  cursor: pointer;
  letter-spacing: 1px;
  border: none;
  transition: 0.2s;
  background: none;
  text-align: start;
  /* border-radius: 3px; */
  /* border-bottom: 1px solid #0003; */

  &:hover {
    background: #7161ef;
    color: #fff;
    /* border-radius: 3px; */
  }
`;
export default function Sorting(props) {
  const sortBooks = (type) => {
    let sortButton = document.getElementById("sort-button");

    const sorted = [...props.bookList].sort((a, b) =>
      a.book_details[0][type] > b.book_details[0][type]
        ? 1
        : b.book_details[0][type] > a.book_details[0][type] || b[type] > a[type]
        ? -1
        : 0
    );
    props.setBookList(sorted);
    let firstCapitalType = type.charAt(0).toUpperCase() + type.slice(1);
    sortButton.innerHTML = type === "rank" ? "Sort" : "By " + firstCapitalType;
  };

  const openSorting = () => {
    let sortingContainer = document.getElementById("sorting-container");
    sortingContainer.classList.add("sorting-opened");
  };

  const closeSorting = () => {
    let sortingContainer = document.getElementById("sorting-container");
    sortingContainer.classList.remove("sorting-opened");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
      }}
      onMouseEnter={openSorting}
      onMouseLeave={closeSorting}
    >
      <SortingOpener id="sort-button">Sort</SortingOpener>
      <SortingContainer id="sorting-container">
        <SortingDropdown>
          <SortingButton
            value="rank"
            onClick={(e) => sortBooks(e.target.value)}
          >
            Default
          </SortingButton>
          <SortingButton
            value="title"
            onClick={(e) => sortBooks(e.target.value)}
          >
            By Title
          </SortingButton>
          <SortingButton
            value="author"
            onClick={(e) => sortBooks(e.target.value)}
          >
            By Author
          </SortingButton>
          <SortingButton
            value="publisher"
            onClick={(e) => sortBooks(e.target.value)}
          >
            By Publisher
          </SortingButton>
        </SortingDropdown>
      </SortingContainer>
    </div>
  );
}
