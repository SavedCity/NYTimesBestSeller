import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const Card = styled.div``;

const Title = styled.h3`
  color: blue;
`;

const ProductUrl = styled.a`
  color: red;
`;

const Author = styled.h5`
  color: green;
`;

const Description = styled.p`
  color: black;
`;

export default function IdPage() {
  const [bookList, setBookList] = useState([]);

  const loading = useSelector((state) => state.loading);

  const params = useParams();

  useEffect(() => {
    fetchBookList();
    // eslint-disable-next-line
  }, [params]);

  const fetchBookList = async () => {
    const bookListUrl = "https://api.nytimes.com/svc/books/v3/lists.json?list";
    const apiKey = "FGuAAGxWuiRNhKjRZsrPKUUiSbtOJUG1";

    const response = await axios
      .get(`${bookListUrl}=${params.idpage}&api-key=${apiKey}`)
      .catch((err) => {
        console.log(err);
      });
    setBookList(response.data.results);
  };

  return (
    <div>
      {!loading ? (
        <>
          {bookList.map((books, key) => {
            return (
              <Card key={key}>
                <ProductUrl href={books.amazon_product_url} target="_blank">
                  Buy Book
                </ProductUrl>
                <Title>{books.book_details[0].title}</Title>
                <Author>{books.book_details[0].author}</Author>
                <Description>{books.book_details[0].description}</Description>
              </Card>
            );
          })}
        </>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
}
