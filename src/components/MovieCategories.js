import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import axios from "axios";

const CategoryContainer = styled.div``;

const Title = styled.h1`
  font-size: 1.1vw;
  margin: 8px;
`;

const Date = styled.h5`
  margin: 8px;
  font-size: 1vw;
`;

const Summary = styled.h5`
  margin: 8px;
  font-size: 1vw;
`;

const MovieLink = styled.a`
  margin: 8px;
  font-size: 1vw;
  text-decoration: none;
  color: black;
`;

const Rating = styled.h4`
  font-size: 1vw;
  color: red;
`;

export default function Categories() {
  const [movies, setMovies] = useState([]);
  const loading = useSelector((state) => state.loading);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMovieCategories();
    // eslint-disable-next-line
  }, []);

  const fetchMovieCategories = async () => {
    const response = await axios
      .get(
        `https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=B96BsMyHZskb1xX0KJMMsfVweArZ2Q8f`
      )
      .catch((err) => {
        console.log(err);
      });
    setMovies(response.data.results);
  };
  console.log(categories);

  return (
    <div>
      <CategoryContainer id="movies-category-container">
        {!loading ? (
          <>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                margin: "20px 0",
              }}
            >
              {movies
                .sort((a, b) =>
                  a.display_name > b.display_name
                    ? 1
                    : b.display_name > a.display_name
                    ? -1
                    : 0
                )
                .filter((category) => {
                  if (searchTerm === "") {
                    return category;
                  } else if (
                    category.display_title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return category;
                  }
                  return null;
                })
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
                      key={key}
                      style={{
                        display: "flex",
                        flex: "1",
                        flexBasis: "30%",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          background: "#0003",
                          height: "400px",
                          border: "2px solid black",
                          width: "80%",
                        }}
                      >
                        <Title>Title - {display_title}</Title>
                        <Rating className={rating}>Rated - {rating}</Rating>
                        <Date>Date - {publication_date}</Date>
                        <Summary>Description - {summary_short}</Summary>
                        <MovieLink target="_blank " href={link.url}>
                          Movie Link
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
