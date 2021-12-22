import styled from "styled-components";
import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  /* background: #0003; */
  overflow: hidden;
`;

const CategoryBox = styled.div`
  margin: 10px 0px;
`;

const CategoryLink = styled(Link)`
  color: #282828;
  font: 400 1.2rem barlow;
  text-decoration: none;
  background: #0001;
  border-radius: 3px;
  padding: 5px 10px;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    background: #cbaffe;
  }
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
      <CategoryContainer>
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
                const { list_id, list_name } = category;

                return (
                  <CategoryBox key={list_id}>
                    <div onClick={defaultSort}>
                      <CategoryLink
                        to={category.list_name_encoded}
                        // className={(isActive) =>
                        //   "category" + isActive
                        //     ? "active-category"
                        //     : "inactive-category"
                        // }
                      >
                        {list_name}
                      </CategoryLink>
                    </div>
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
