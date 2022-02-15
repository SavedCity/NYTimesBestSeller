import styled from "styled-components";
import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0 5px 25px;
  overflow: hidden;
  max-height: 0px;
  transition: 0.3s;
`;

const CategoryBox = styled.div`
  margin: 5px 10px;
  transition: 0.3s;
  padding: 0 0 8px 0;
`;

const BookLink = styled(Link)`
  padding: 0 0 8px 0;
  color: #282828;
  font: 400 1.2rem barlow;
  text-decoration: none;
  transition: 0.3s;
  white-space: nowrap;
  background: linear-gradient(#4a4a4a, #4a4a4a) no-repeat 0% 100%;
  background-size: 0% 0.1em;

  &:hover {
    background-size: 100% 0.1em;
  }
`;

const SeeAll = styled(Link)`
  padding: 0 0 12px 10px;
  color: #282828;
  font: 500 1.2rem barlow;
  text-decoration: none;
  transition: 0.3s;
  color: #1117;

  &:hover {
    color: #0009;
  }
`;

export default function Categories({ setCurrentButton }) {
  const categories = useSelector((state) => state.allBookCategories);
  const loading = useSelector((state) => state.loading);

  const defaultSort = () => {
    let sortButton = document.getElementById("sort-button");
    if (sortButton !== null) {
      sortButton.innerHTML = "Sort By: Rank: High to Low";
    }
    setCurrentButton("Sort By: Rank: High to Low");
  };

  return (
    <div>
      <CategoryContainer id="books-category-container">
        {!loading ? (
          <>
            {categories
              .sort((a, b) =>
                a.list_name > b.list_name
                  ? 1
                  : b.list_name > a.list_name
                  ? -1
                  : 0
              )
              .slice(0, 10)
              .map((category) => {
                const { list_id, list_name, list_name_encoded } = category;

                return (
                  <CategoryBox onClick={defaultSort} key={list_id}>
                    <BookLink to={"/bookcategory/" + list_name_encoded}>
                      {list_name}
                    </BookLink>
                  </CategoryBox>
                );
              })}
          </>
        ) : (
          <div className="loader"></div>
        )}
        <SeeAll to="/bookcategory">See all</SeeAll>
      </CategoryContainer>
    </div>
  );
}
