import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

export default function IdPage() {
  const [bookList, setBookList] = useState([]);

  const Card = styled.div``;

  const Title = styled.h3`
    color: blue;
  `;

  const ProductUrl = styled.a`
    color: red;
    cursor: pointer;
  `;

  const Author = styled.h5`
    color: green;
  `;

  const Description = styled.p`
    color: black;
  `;

  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    fetchBookList();
    // eslint-disable-next-line
  }, []);
  let params = useParams();
  let newParams = params.idpage.replace(/\s/g, "-");
  const fetchBookList = async () => {
    const response = await axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists.json?list=${newParams}&api-key=FGuAAGxWuiRNhKjRZsrPKUUiSbtOJUG1`
      )
      .catch((err) => {
        console.log(err);
      });
    setBookList(response.data.results);
  };

  return (
    <div>
      {!loading ? (
        <>
          {bookList.map((books) => {
            return (
              <Card>
                <Link to={books.amazon_product_url}>Buy</Link>
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
