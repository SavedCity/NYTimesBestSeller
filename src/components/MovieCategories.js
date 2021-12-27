import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  transition: 0.3s;
`;

const CategoryBox = styled.div`
  margin: 5px 10px;
  border-bottom: 1px solid #140152;
  width: 0;
  transition: 0.3s;
  padding: 0 0 8px 0;

  &:hover {
    width: 100%;
  }
`;

const CategoryLink = styled(Link)`
  color: #282828;
  font: 400 1.2rem barlow;
  text-decoration: none;
  transition: 0.3s;
  white-space: nowrap;
`;

const Title = styled.h1`
  font-size: 1.7vw;
`;

const Date = styled.h5`
  font-size: 1vw;
`;

const Summary = styled.h5`
  font-size: 1vw;
  text-wrap: nowrap;
  overflow: scroll;
`;

const MovieLink = styled.a`
  font-size: 1vw;
  text-decoration: none;
  color: black;
`;

const Rating = styled.h4`
  font-size: 1vw;
  color: red;
`;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    fetchMovieCategories();
    // eslint-disable-next-line
  }, []);

  const fetchMovieCategories = async () => {
    const response = await axios
      .get(
        "https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=B96BsMyHZskb1xX0KJMMsfVweArZ2Q8f"
      )
      .catch((err) => {
        console.log(err);
      });
    setCategories(response.data.results);
  };
  console.log(categories);

  const resetDropDown = () => {
    const dropDown = document.getElementById("sorting-option");
    dropDown.selectedIndex = 0;
  };

  return (
    <div>
      <CategoryContainer id="movies-category-container">
        {!loading ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}>
              {categories
                .sort((a, b) =>
                  a.display_name > b.display_name
                    ? 1
                    : b.display_name > a.display_name
                    ? -1
                    : 0
                )
                .map((category, key) => {
                  const {
                    display_title,
                    publication_date,
                    summary_short,
                    link,
                  } = category;

                  let rating = category.mpaa_rating.replace("-", "");

                  return (
                    <div
                      style={{
                        position: "relative",
                        flex: "1",
                        flexBasis: "33%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",

                          fontSize: "400px",
                          background: "#0003",
                          height: "400px",
                          width: "350px",
                          border: "2px solid black",
                          marginBottom: "10px",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          flexDirection: "column",
                          top: "60px",
                          height: "300px",
                          width: "250px",
                          overflow: "scroll",
                          marginLeft: "20px",
                        }}
                      >
                        <Title>Title - {display_title}</Title>
                        <Rating className={rating}>Rated - {rating}</Rating>
                        <Date>Date - {publication_date}</Date>
                        <Summary>Description - {summary_short}</Summary>
                        <MovieLink target="_blank " href={link.url}>
                          Movie Link - {link.url}
                        </MovieLink>
                      </div>
                    </div>
                  );
                })}
            </div>
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
