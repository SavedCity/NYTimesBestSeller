import styled from "styled-components";
import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  max-height: 0px;
  transition: 0.3s;
`;

const CategoryBox = styled.div`
  margin: 5px 10px;
  border-bottom: 1px solid #140152;
  width: 0;
  transition: 0.3s;
  padding: 0 0 8px 0;

  &:hover {
    width: 100%;
  }
`;

const CategoryLink = styled(Link)`
  color: #282828;
  font: 400 1.2rem barlow;
  text-decoration: none;
  transition: 0.3s;
  white-space: nowrap;
`;

export default function Categories() {
  const categories = useSelector((state) => state.allBookCategories);
  const loading = useSelector((state) => state.loading);

  const defaultSort = () => {
    let sortButton = document.getElementById("sort-button");
    if (sortButton !== null) {
      sortButton.innerHTML = "Sort";
    }
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
              .map((category) => {
                const { list_id, list_name, list_name_encoded } = category;

                return (
                  <CategoryBox onClick={defaultSort} key={list_id}>
                    <CategoryLink to={list_name_encoded}>
                      {list_name}
                    </CategoryLink>
                  </CategoryBox>
                );
              })}
          </>
        ) : (
          <div className="loader-div">
            <div className="loader"></div>
          </div>
        )}
      </CategoryContainer>
    </div>
  );
}
