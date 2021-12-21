import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components";

import AmazonLogoImg from "../images/amazon.png";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  justify-content: center;
`;

const Card = styled.div`
  margin: 20px;
  padding: 10px;
  border: 1px solid #03045e33;
  width: 20vw;
  flex: 1;
  flex-basis: 20%;
  border-radius: 8px;
  position: relative;
`;

const Title = styled.h3`
  font: 500 1.1rem sen;
  margin: 10px 0 15px 0;
  border-bottom: 1px solid #0003;
  padding-bottom: 10px;
  color: #03045e;
`;

const Author = styled.h5`
  font: 400 1rem barlow;
  margin: 20px 0 0 0;
`;

const Publisher = styled.h3`
  font: 400 0.8rem barlow;
  margin: 8px 0 0 0;
  border-bottom: 1px solid #0003;
  padding-bottom: 25px;
`;

const Description = styled.p`
  font: 400 0.9rem barlow;
  margin: 22px 0 50px 0;
  letter-spacing: 0.2px;
  word-spacing: 1px;
`;

const BuyBookBox = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

const ProductUrl = styled.h4`
  color: #777;
  text-decoration: none;
  font: 700 0.8rem barlow;
  margin: 0 0 20px 0;
`;

const AmazonLogo = styled.img`
  width: 80px;
  position: absolute;
  bottom: -10px;
  left: -15px;
`;

const CardContainerHeader = styled.div`
  display: flex;
  justify-content: end;
  margin: 20px 20px 0 20px;
`;

const SortingContainer = styled.div`
  /* display: none; */
`;

const SortingOpener = styled.button`
  border: 1px solid #0003;
  font: 500 1rem barlow;
  /* padding: 1px 40px 3px 40px; */
  cursor: pointer;
  background: none;
  border-radius: 3px;

  &:hover {
    background: #7161ef;
    color: #fff;
  }
`;

const SortingDropdown = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  border: 1px solid #0003;
  border-radius: 4px;
`;

const SortingButton = styled.button`
  margin: 3px 0;
  padding: 3px 10px;
  font: 500 1rem barlow;
  cursor: pointer;
  letter-spacing: 1px;
  border: none;
  transition: 0.2s;
  /* background: none; */
  text-align: start;
  border-radius: 3px;

  &:hover {
    background: #7161ef;
    color: #fff;
  }
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
  console.log(bookList);

  const sortBooks = (type) => {
    const sorted = [...bookList].sort((a, b) =>
      a.book_details[0][type] > b.book_details[0][type]
        ? 1
        : b.book_details[0][type] > a.book_details[0][type] || b[type] > a[type]
        ? -1
        : 0
    );
    setBookList(sorted);
  };

  return (
    <div>
      {!loading ? (
        <div>
          <CardContainerHeader>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SortingOpener>Sort</SortingOpener>
              <SortingContainer>
                <SortingDropdown>
                  <SortingButton
                    value="rank"
                    onClick={(e) => sortBooks(e.target.value)}
                  >
                    Default
                  </SortingButton>
                  <SortingButton
                    value="title"
                    onClick={(e) => sortBooks(e.target.value)}
                  >
                    By Title
                  </SortingButton>
                  <SortingButton
                    value="author"
                    onClick={(e) => sortBooks(e.target.value)}
                  >
                    By Author
                  </SortingButton>
                  <SortingButton
                    value="publisher"
                    onClick={(e) => sortBooks(e.target.value)}
                  >
                    By Publisher
                  </SortingButton>
                </SortingDropdown>
              </SortingContainer>
            </div>
          </CardContainerHeader>

          <CardContainer>
            {bookList.map((books, key) => {
              return (
                <Card key={key}>
                  <Title>{books.book_details[0].title}</Title>
                  <Author>
                    <span style={{ color: "#0008", font: "500 1rem sen" }}>
                      Author:{" "}
                    </span>
                    {books.book_details[0].author}
                  </Author>
                  <Publisher>
                    <span style={{ color: "#0008", font: "500 .8rem sen" }}>
                      Publisher:{" "}
                    </span>
                    {books.book_details[0].publisher}
                  </Publisher>
                  <Description>
                    {books.book_details[0].description
                      ? books.book_details[0].description
                      : "No description"}
                  </Description>
                  <div
                    style={{
                      position: "relative",
                      position: "absolute",
                      bottom: "5px",
                    }}
                  >
                    <BuyBookBox href={books.amazon_product_url} target="_blank">
                      <ProductUrl>Buy Book</ProductUrl>
                      <AmazonLogo src={AmazonLogoImg}></AmazonLogo>
                    </BuyBookBox>
                  </div>
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
