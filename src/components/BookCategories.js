import styled from "styled-components";
import React from "react";

// import { setCategories } from "../redux/actions/category_actions";
import { useSelector } from "react-redux";

export default function Categories(props) {
  const categories = useSelector((state) => state.allBookCategories.categories);

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

  return (
    <div>
      <h1>Book Categories</h1>
      <CategoryContainer>
        {!props.loading ? (
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
