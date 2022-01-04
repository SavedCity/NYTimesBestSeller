import React from "react";
import styled from "styled-components";

const SortingContainer = styled.div`
  position: absolute;
  background: #fff;
  top: 36px;
  left: 0;
  z-index: 1;
  width: 263px;
  border: 1px solid transparent;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: 0.3s;
  max-height: 0;
  overflow-y: hidden;
`;

const SortingOpener = styled.button`
  border: 2px solid #6e090b33;
  font: 500 1rem barlow;
  padding: 5px 10px 7px 10px;
  cursor: pointer;
  background: #fff;
  border-radius: 3px;
  width: 100%;
  transition: 0.2s;

  &:hover {
    background: #6e090b;
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
    background: #6e090b;
    color: #fff;
  }
`;

export default function SortMovies(props) {
  const openSorting = () => {
    let sortingContainer = document.getElementById("sorting-container");
    sortingContainer.classList.add("sorting-opened");
  };

  const closeSorting = () => {
    let sortingContainer = document.getElementById("sorting-container");
    sortingContainer.classList.remove("sorting-opened");
  };

  // sorting function
  const sortMovies = (type, HTML) => {
    let sortButton = document.getElementById("sort-button");
    if (
      HTML.includes("New to Old") ||
      HTML.includes("Mature to Family") ||
      HTML.includes("Z-A")
    ) {
      console.log(HTML);
      const sorted = [...props.movies].sort((a, b) =>
        a[type] < b[type] ? 1 : b[type] < a[type] ? -1 : 0
      );
      props.setMovies(sorted);
    }

    if (
      HTML.includes("A-Z") ||
      HTML.includes("Family to Mature") ||
      HTML.includes("Old to New")
    ) {
      console.log(HTML);
      const sorted = [...props.movies].sort((a, b) =>
        a[type] > b[type] ? 1 : b[type] > a[type] ? -1 : 0
      );
      props.setMovies(sorted);
    }

    sortButton.innerHTML = "Sort By: " + HTML;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "265px",
      }}
      onMouseEnter={openSorting}
      onMouseLeave={closeSorting}
    >
      <SortingOpener id="sort-button">Sort By: Date: New to Old</SortingOpener>
      <SortingContainer id="sorting-container">
        <SortingDropdown>
          <SortingButton
            value="publication_date"
            onClick={(e) => sortMovies(e.target.value, e.target.innerHTML)}
          >
            Date: New to Old
          </SortingButton>

          <SortingButton
            value="publication_date"
            onClick={(e) => sortMovies(e.target.value, e.target.innerHTML)}
          >
            Date: Old to New
          </SortingButton>

          <SortingButton
            value="display_title"
            onClick={(e) => sortMovies(e.target.value, e.target.innerHTML)}
          >
            Title: A-Z
          </SortingButton>

          <SortingButton
            value="display_title"
            onClick={(e) => sortMovies(e.target.value, e.target.innerHTML)}
          >
            Title: Z-A
          </SortingButton>

          <SortingButton
            value="mpaa_rating"
            onClick={(e) => sortMovies(e.target.value, e.target.innerHTML)}
          >
            Rating: Mature to Family
          </SortingButton>

          <SortingButton
            value="mpaa_rating"
            onClick={(e) => sortMovies(e.target.value, e.target.innerHTML)}
          >
            Rating: Family to Mature
          </SortingButton>
        </SortingDropdown>
      </SortingContainer>
    </div>
  );
}
