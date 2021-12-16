import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  margin: 10px auto;
  padding: 10px;
  border: 1px solid;
  width: 20vw;
`;

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

  const sortBooks = (type) => {
    const sorted = [...bookList].sort((a, b) =>
      a.book_details[0][type] > b.book_details[0][type]
        ? 1
        : b.book_details[0][type] > a.book_details[0][type] || b[type] > a[type]
        ? -1
        : 0
    );
    setBookList(sorted);
    console.log(sorted);
  };

  return (
    <div>
      {!loading ? (
        <div>
          <select
            id="sorting-option"
            onChange={(e) => sortBooks(e.target.value)}
          >
            <option value="rank">Default</option>
            <option value="title">By Title</option>
            <option value="author">By Author</option>
            <option value="publisher">By Publisher</option>
          </select>

          <CardContainer>
            {bookList.map((books, key) => {
              return (
                <Card key={key}>
                  <Title>{books.rank}</Title>

                  <ProductUrl href={books.amazon_product_url} target="_blank">
                    Buy Book
                  </ProductUrl>
                  <Title>{books.book_details[0].title}</Title>
                  <Title>{books.book_details[0].publisher}</Title>

                  <Author>{books.book_details[0].author}</Author>
                  <Description>{books.book_details[0].description}</Description>
                </Card>
              );
            })}
          </CardContainer>
        </div>
      ) : (
        <div className="loader-div">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
