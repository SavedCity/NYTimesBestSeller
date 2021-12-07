import styled from "styled-components";
import React from "react";

import { useSelector } from "react-redux";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryBox = styled.div`
  margin: 10px 0;
`;

const CategoryName = styled.a`
  color: #282828;
  font-size: 1.6rem;
`;

export default function Categories(props) {
  const categories = useSelector((state) => state.allBookCategories);
  const loading = useSelector((state) => state.loading);

  return (
    <div>
      <h1>Book Categories</h1>
      <CategoryContainer>
        {!loading ? (
          <>
            {categories.map((category) => {
              const { list_id, list_name } = category;
              return (
                <CategoryBox key={list_id}>
                  <CategoryName href="#">{list_name}</CategoryName>
                </CategoryBox>
              );
            })}
          </>
        ) : (
          <h1>LOADING...</h1>
        )}
      </CategoryContainer>
    </div>
  );
}
