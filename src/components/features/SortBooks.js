import React from "react";
import styled from "styled-components";

const SortingContainer = styled.div`
  position: absolute;
  background: #fff;
  top: 36px;
  left: 0;
  z-index: 1;
  width: 268px;
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
  margin: 0;
  padding: 10px 10px;
  font: 500 1rem barlow;
  cursor: pointer;
  letter-spacing: 1px;
  border: none;
  transition: 0.2s;
  background: none;
  text-align: start;

  &:hover {
    background: #7161ef;
    color: #fff;
  }
`;
export default function SortBooks(props) {
  const openSorting = () => {
    let sortingContainer = document.getElementById("sorting-container");
    sortingContainer.classList.add("sorting-opened");
  };

  const closeSorting = () => {
    let sortingContainer = document.getElementById("sorting-container");
    sortingContainer.classList.remove("sorting-opened");
  };

  const sortBooks = (type, HTML) => {
    let sortButton = document.getElementById("sort-button");

    if (HTML.includes("A-Z") || HTML.includes("High to Low")) {
      const sorted = [...props.bookList].sort((a, b) =>
        a.book_details[0][type] > b.book_details[0][type]
          ? 1
          : b.book_details[0][type] > a.book_details[0][type] ||
            b[type] > a[type]
          ? -1
          : 0
      );
      props.setBookList(sorted);
    }

    if (HTML.includes("Z-A") || HTML.includes("Low to High")) {
      const sorted = [...props.bookList].sort((a, b) =>
        a.book_details[0][type] < b.book_details[0][type]
          ? 1
          : b.book_details[0][type] < a.book_details[0][type] ||
            b[type] < a[type]
          ? -1
          : 0
      );
      props.setBookList(sorted);
    }

    sortButton.innerHTML = "Sort By: " + HTML;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "270px",
      }}
      onMouseEnter={openSorting}
      onMouseLeave={closeSorting}
    >
      <SortingOpener id="sort-button">Sort By: Rank: High to Low</SortingOpener>
      <SortingContainer id="sorting-container">
        <SortingDropdown>
          <SortingButton
            value="rank"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Rank: High to Low
          </SortingButton>

          <SortingButton
            value="rank"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Rank: Low to High
          </SortingButton>

          <SortingButton
            value="title"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Title: A-Z
          </SortingButton>

          <SortingButton
            value="title"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Title: Z-A
          </SortingButton>

          <SortingButton
            value="author"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Author: A-Z
          </SortingButton>

          <SortingButton
            value="author"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Author: Z-A
          </SortingButton>

          <SortingButton
            value="publisher"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Publisher: A-Z
          </SortingButton>

          <SortingButton
            value="publisher"
            onClick={(e) => sortBooks(e.target.value, e.target.innerHTML)}
          >
            Publisher: Z-A
          </SortingButton>
        </SortingDropdown>
      </SortingContainer>
    </div>
  );
}
