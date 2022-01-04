import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components";

import AmazonLogoImg from "../images/amazon.png";

import Sorting from "./features/SortBooks";

const CardContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 9vw 50px 9vw;
  align-items: center;
`;

const ListName = styled.h3`
  font: 400 1.6rem barlow;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px 8vw 50px 8vw;
  justify-content: center;
`;

const Card = styled.div`
  margin: 20px;
  padding: 10px;
  border: 2px solid #03045e33;
  width: 20vw;
  flex: 1;
  flex-basis: 25%;
  border-radius: 8px;
  position: relative;
  box-shadow: 4px 4px #03045e33;
`;

const Title = styled.h3`
  font: 500 1.1rem sen;
  margin: 10px 0 15px 0;
  border-bottom: 1px solid #0003;
  padding-bottom: 10px;
  color: #22007c;
`;

const Author = styled.h5`
  font: 400 1rem barlow;
  margin: 10px 0 0 0;
`;

const Rank = styled.h5`
  font: 400 1rem barlow;
  margin: 10px 0 0 0;
  color: #22007c;
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

  let listName = params.idpage.replaceAll("-", " ").split(" ");

  for (let i = 0; i < listName.length; i++) {
    listName[i] =
      " " + listName[i].charAt(0).toUpperCase() + listName[i].slice(1);
  }

  return (
    <div style={{ width: "100%" }}>
      <CardContainerHeader>
        <ListName>
          <span
            style={{
              font: "400 1.6rem barlow",
              color: "#03045e",
            }}
          >
            {bookList.length}{" "}
          </span>
          results for:
          <span
            style={{
              font: "400 1.6rem barlow",
              color: "#03045e",
            }}
          >
            {listName}
          </span>
        </ListName>
        <Sorting bookList={bookList} setBookList={setBookList} />
      </CardContainerHeader>
      {!loading ? (
        <div>
          <CardContainer>
            {bookList.map((books, key) => {
              return (
                <Card key={key}>
                  <Title>{books.book_details[0].title}</Title>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Author>
                      <span style={{ color: "#0008", font: "500 1rem sen" }}>
                        Author:{" "}
                      </span>
                      {books.book_details[0].author}
                    </Author>
                    <Rank>
                      <span style={{ color: "#0008", font: "500 .8rem sen" }}>
                        Rank:{" "}
                      </span>
                      {books.rank}
                    </Rank>
                  </div>
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
        <div className="loader"></div>
      )}
    </div>
  );
}
