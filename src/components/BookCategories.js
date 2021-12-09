import styled from "styled-components";
import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryTitle = styled.h1`
  text-decoration: underline;
  color: #25b;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryBox = styled.div`
  margin: 10px 0px;
`;

const CategoryLink = styled(Link)`
  color: #282828;
  font-size: 1.2rem;
  text-decoration: none;
  background: #0001;
  border-radius: 3px;
  padding: 5px 10px;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    background: #0002;
  }
`;

export default function Categories() {
  const categories = useSelector((state) => state.allBookCategories);
  const loading = useSelector((state) => state.loading);

  return (
    <div>
      <CategoryTitle>Book Categories</CategoryTitle>
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

                console.log();

                return (
                  <CategoryBox key={list_id}>
                    <CategoryLink to={category.list_name_encoded}>
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
