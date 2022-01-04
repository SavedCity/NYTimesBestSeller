import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import axios from "axios";

import SortMovies from "./features/SortMovies";

const CardContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 9vw 50px 9vw;
  align-items: center;
`;

const MagnifyingGlass = styled.i`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 1.6rem;
  color: #0006;
  cursor: text;
`;

const SearchInput = styled.input`
  width: 130px;
  height: 35px;
  border-radius: 25px;
  border: 2px solid #0006;
  background: transparent;
  padding: 4px 4px 4px 45px;
  font: 500 1.1rem barlow;
  transition: 0.4s;
  position: absolute;
  z-index: 1;

  &:focus {
    outline: none;
    width: 300px;
    border: 2px solid #4b4b4b;
  }

  &:hover {
    border: 2px solid #4b4b4b;
  }
`;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 20px 50px;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 20px;
  border: 2px solid #6e090b33;
  box-shadow: 4px 4px #6e090b33;
  position: relative;
`;

const Title = styled.h1`
  font: 500 1.3rem sen;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #0003;
  padding-bottom: 10px;
  color: #6e090b;
`;

const Rating = styled.h4`
  font: 500 1rem barlow;
  margin: 0;
  color: #0009;
`;

const Date = styled.h5`
  font: 500 1rem barlow;
  color: #0009;
`;

const Snapshot = styled.h4`
  font: 500 1rem barlow;
  margin: 0 0 8px 0;
  color: #0009;
`;

const MovieSnapshot = styled.img`
  border-radius: 2px;
  margin-bottom: 40px;
  width: 100%;
`;

const DescriptionButton = styled.h4`
  margin: 3px 0 0 0;
  cursor: pointer;
  background: #0001;
  text-align: center;
  border-radius: 3px;
  padding: 5px 8px 8px 8px;
  font: 500 1rem barlow;
  transition: 0.3s;

  &:hover {
    background: #6e090b33;
  }
`;

const Summary = styled.h5`
  font: 500 1.15rem barlow;
  letter-spacing: 0.4px;
  word-spacing: 2px;

  &:hover {
    /* height: 91%;
    opacity: 1;
    visibility: visible; */
  }
`;

const SummaryBox = styled.div`
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  position: absolute;
  top: 4px;
  left: 4px;
  height: 0%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.3s, height 0.4s;
  transition-timing-function: ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
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

  const highlightTitle = (e) => {
    let textToSearch = e.target.value;
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let pattern = new RegExp(`${textToSearch}`, "gi");

    for (let i = 0; i < movies.length; i++) {
      let title = document.getElementById(movies[i].display_title);
      if (title !== null) {
        title.innerHTML = title.textContent.replace(
          pattern,
          (match) => `<mark>${match}</mark>`
        );
      }
    }
  };
  console.log(movies);

  return (
    <div style={{ width: "100%" }}>
      <CardContainerHeader>
        <div
          style={{
            position: "relative",
            width: "10px",
            height: "48px",
          }}
        >
          <MagnifyingGlass className="fas fa-search" />
          <SearchInput
            className="search"
            type="text"
            placeholder="Search Titles"
            onChange={async (e) => {
              await setSearchTerm(e.target.value);
              highlightTitle(e);
            }}
          />
        </div>
        <SortMovies setMovies={setMovies} movies={movies} />
      </CardContainerHeader>
      {!loading ? (
        <div style={{ display: "flex" }}>
          <MovieContainer>
            {movies
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
                  mpaa_rating,
                  multimedia,
                  // link,
                } = category;
                let rating = mpaa_rating.replace("-", "");

                let abbMonths = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                let splitDate = publication_date.split("-");
                let monthDate = splitDate[1];
                monthDate = abbMonths[monthDate - 1];

                let rearrangedDate =
                  monthDate +
                  " " +
                  splitDate.splice(2).join(" ") +
                  ", " +
                  splitDate[0];

                let ratedR = "#a10000";
                let ratedPG13 = "#023e8a";
                let ratedPG = "#023e8a";

                return (
                  <Card key={key}>
                    <Title id={display_title}>{display_title}</Title>
                    {rating ? (
                      <Rating>
                        Rated{" "}
                        <span
                          style={
                            rating === "R"
                              ? {
                                  color: ratedR,
                                  font: " 600 1rem barlow",
                                  marginLeft: "5px",
                                  borderRadius: "4px",
                                  background: "#0001",
                                  padding: "5px 10px",
                                }
                              : rating === "PG"
                              ? {
                                  color: ratedPG,
                                  font: " 600 1rem barlow",
                                  marginLeft: "5px",
                                  borderRadius: "4px",
                                  background: "#0001",
                                  padding: "5px 6px",
                                }
                              : rating === "PG13"
                              ? {
                                  color: ratedPG13,
                                  font: " 600 1rem barlow",
                                  marginLeft: "5px",
                                  borderRadius: "4px",
                                  background: "#0001",
                                  padding: "5px 7px",
                                }
                              : {
                                  color: "#5a189a",
                                  font: " 600 1rem barlow",
                                  marginLeft: "5px",
                                  borderRadius: "4px",
                                  background: "#0001",
                                  padding: "4px",
                                }
                          }
                        >
                          {rating}
                        </span>
                      </Rating>
                    ) : (
                      <Rating>Not Yet Rated</Rating>
                    )}
                    <Date>
                      Released on{" "}
                      <span style={{ font: "500 1rem barlow", color: "#000" }}>
                        {rearrangedDate}
                      </span>
                    </Date>

                    <Snapshot>Snapshot:</Snapshot>
                    <MovieSnapshot src={multimedia.src} alt={display_title} />

                    <DescriptionButton className="summary-button">
                      View Summary
                    </DescriptionButton>
                    <SummaryBox className="summary">
                      <Summary>{summary_short}</Summary>
                    </SummaryBox>
                  </Card>
                );
              })}
          </MovieContainer>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
