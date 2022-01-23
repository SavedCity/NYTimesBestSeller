import styled from "styled-components";
import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 50px auto;
`;

const CategoryBox = styled.div`
  margin: 5px 10px;
  padding: 40px;
  border: 1px solid #0003;
  flex: 1;
  flex-basis: 40%;
  max-width: 50%;
`;

const FirstLetter = styled.h1`
  font: 600 2rem barlow;
`;

const CategoryLink = styled(Link)`
  color: #282828;
  font: 400 1.4rem barlow;
  text-decoration: none;
  transition: 0.3s;
  /* white-space: nowrap; */
  background: linear-gradient(#4a4a4a, #4a4a4a) no-repeat 0% 100%;
  background-size: 0% 0.1em;

  &:hover {
    background-size: 100% 0.1em;
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

  let groupedCategories = {};
  for (let i = 0; i < categories.length; i++) {
    let firstLetter = categories[i].list_name.charAt(0);
    if (groupedCategories[firstLetter] === undefined) {
      groupedCategories[firstLetter] = [];
    }
    groupedCategories[firstLetter].push(categories[i]);
  }

  let groupedCategoriesArr = Object.keys(groupedCategories).map((key) => {
    return groupedCategories[key];
  });

  for (let i = 0; i < groupedCategoriesArr.length; i++) {
    let firstLetter = groupedCategoriesArr[i][0].list_name.charAt(0);
    groupedCategoriesArr[i].splice(0, 0, { firstLetter });
  }

  console.log(groupedCategoriesArr);

  return (
    <div>
      <CategoryContainer id="books-category-container">
        {!loading ? (
          <>
            {groupedCategoriesArr.map((category) => {
              return (
                <CategoryBox>
                  {" "}
                  {category.map((category, index) => {
                    const { list_name, list_name_encoded, firstLetter } =
                      category;
                    return (
                      <div
                        style={{ margin: "10px 0" }}
                        key={index}
                        onClick={defaultSort}
                      >
                        {firstLetter && (
                          <FirstLetter>{firstLetter}</FirstLetter>
                        )}
                        {list_name_encoded && (
                          <CategoryLink to={list_name_encoded}>
                            {list_name}
                          </CategoryLink>
                        )}
                      </div>
                    );
                  })}
                </CategoryBox>
              );
            })}
          </>
        ) : (
          <div className="loader"></div>
        )}
      </CategoryContainer>
    </div>
  );
}
