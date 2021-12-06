import React from "react";
import styled from "styled-components";

export default function Books(props) {
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
    <CategoryContainer>
      {props.booksData.lists.map((book) => {
        return (
          <CategoryBox key={book.list_id}>
            <CategoryName href="#">{book.list_name}</CategoryName>
          </CategoryBox>
        );
      })}
    </CategoryContainer>
  );
}
