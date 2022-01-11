import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import axios from "axios";

import SortMovies from "./features/SortMovies";

const CardContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 9vw 50px 4.5vw;
  align-items: center;
`;

const ResultsLength = styled.i`
  font: 500 1.6rem barlow;
  color: #9f0606;
  max-width: 100px;
  white-space: nowrap;
`;

const MagnifyingGlass = styled.i`
  position: absolute;
  top: 14px;
  left: 12px;
  font-size: 1.6rem;
  color: #0006;
  cursor: text;
`;

const SearchInput = styled.input`
  width: 150px;
  height: 40px;
  border-radius: 25px;
  border: 2px solid #0003;
  background: transparent;
  padding: 4px 4px 4px 45px;
  font: 400 1.2rem barlow;
  transition: 0.4s;
  position: absolute;
  z-index: 1;

  &:focus {
    outline: none;
    width: 300px;
    border: 2px solid #4b4b4b99;
  }

  &:hover {
    border: 2px solid #4b4b4b99;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 20px 0 0 0;
  max-width: 8%;
  min-width: 8%;
  padding: 0 1vw 0 4vw;
`;

const Filter = styled.div`
  font: 1.3rem sen;
  text-align: center;
  background: linear-gradient(#6e090b55, #6e090b55) no-repeat 0% 100%;
  background-size: 10vw 0.1em;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
const FilterLabel = styled.label`
  font: 400 1.2rem barlow;
  white-space: nowrap;
  padding-left: 35px;
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const FilterInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0px;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #fff;
  transition: 0.2s;
  border: 2px solid #6e090b77;

  &:after {
    content: "";
    position: absolute;
    opacity: 0;
    visibility: hidden;
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    transition: 0.2s;
  }
`;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 20px 60px;
  justify-content: center;
  width: 90%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 320px; */
  padding: 20px;
  border: 2px solid #6e090b33;
  box-shadow: 4px 4px #6e090b33;
  position: relative;
  flex: 1;
  flex-basis: 260px;
`;

const Title = styled.h1`
  font: 500 1.3rem sen;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #0003;
  padding-bottom: 10px;
  color: #6e090b;
`;

const Star = styled.div`
  font: 500 1.3rem sen;
  color: #be090b;
  float: right;
  position: absolute;
  cursor: default;
  top: 17px;
  right: 15px;
`;

const StarToolTip = styled.div`
  font: 500 1.1rem sen;
  color: #fff;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  width: 170px;
  background-color: #333;
  z-index: 1;
  top: -15px;
  left: 36px;
  padding: 10px;
  text-align: center;
  border-radius: 2px;
  transition: 0.3s;
  line-height: 24px;

  &:before {
    content: "";
    width: 13px;
    height: 13px;
    border: solid #333;
    background-color: #333;
    transform: rotate(-33deg) skew(20deg);
    position: absolute;
    top: 21px;
    left: -6px;
  }
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
  const [filters, setFilters] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [offset, setOffset] = useState(0);
  const [paginateButtons, setPaginateButtons] = useState([]);
  const loading = useSelector((state) => state.loading);
  const [searchTerm, setSearchTerm] = useState("");

  const paginate = () => {
    setOffset(offset + 20);
  };

  const back = () => {
    setOffset(offset - 20);
  };

  useEffect(() => {
    if (filters.length === 0) {
      fetchMovieCategories();
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          filters.some((category) =>
            [movie.mpaa_rating].flat().includes(category)
          )
        )
      );
    }

    // eslint-disable-next-line
  }, [filters, offset]);

  const url = `https://api.nytimes.com/svc/movies/v2/reviews/all.json?offset=${offset}&api-key=B96BsMyHZskb1xX0KJMMsfVweArZ2Q8f`;

  const fetchMovieCategories = async () => {
    const response = await axios.get(url).catch((err) => {
      console.log(err);
    });

    setMovies(response.data.results);
    // if (filteredMovies.length === 0) {
    setFilteredMovies(response.data.results);
    // }

    const addDataIntoCache = () => {
      // Converting our respons into Actual Response form
      const data = new Response(JSON.stringify(response.data.results));
      if ("caches" in window) {
        // Opening given cache and putting our data into it
        caches.open("cacheMovieData").then((cache) => {
          cache.put(url, data);
          alert("MovieData Added into cache!");
        });
      }
    };
    addDataIntoCache();
  };

  // Highlight the typed letters if they match the title
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

  // Abbreviated months
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

  // Getting today's date, abbreviating the month, adding a "0" if the day is less than 10 (e.g. Jan 06, 2021).
  const rawDate = new window.Date();
  let currentAbbMonth = abbMonths[rawDate.getMonth()];
  const currentDate = `${currentAbbMonth} ${
    rawDate.getDate() < 10 ? "0" + rawDate.getDate() : rawDate.getDate()
  }, ${rawDate.getFullYear()}`;

  const filterCheckbox = (eTarget) => {
    if (eTarget.checked) {
      setFilters([...filters, eTarget.value]);
    } else {
      setFilters(filters.filter((id) => id !== eTarget.value));
    }
    let sortButton = document.getElementById("sort-button");
    if (sortButton !== null) {
      sortButton.innerHTML = "Sort By: Date: New to Old";
    }
  };

  // Only unique values for movie ratings
  const movieRatings = [...new Set(movies.map((q) => q.mpaa_rating))];

  return (
    <div style={{ width: "100%" }}>
      <CardContainerHeader>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "6vw" }}
        >
          <button onClick={back}>BACK</button>
          {paginateButtons.map((button) => {
            return <button>{button}</button>;
          })}
          <button onClick={paginate}>NEXT</button>
          <ResultsLength>{filteredMovies.length} Results</ResultsLength>
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
        </div>
        <SortMovies
          setFilteredMovies={setFilteredMovies}
          filteredMovies={filteredMovies}
        />
      </CardContainerHeader>
      <div style={{ display: "flex" }}>
        <FilterContainer>
          <Filter>Filter</Filter>

          {movieRatings
            .sort((a, b) => (a < b ? 1 : b < a ? -1 : 0))
            .map((rating, key) => {
              return (
                <FilterLabel
                  key={key}
                  className="filter-label"
                  htmlFor={"rated-" + rating}
                >
                  {rating ? "Rated " + rating : "Not Yet Rated"}
                  <FilterInput
                    onChange={async (e) => {
                      filterCheckbox(e.target);
                    }}
                    value={rating}
                    id={"rated-" + rating}
                    type="checkbox"
                  />
                  <Checkmark className="checkmark"></Checkmark>
                </FilterLabel>
              );
            })}
        </FilterContainer>
        {!loading && filteredMovies.length > 0 ? (
          <div>
            <MovieContainer>
              {filteredMovies
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
                      <Title id={display_title}>
                        {display_title ? (
                          display_title
                        ) : (
                          <span style={{ color: "#6e090b" }}>(No Title)</span>
                        )}
                      </Title>
                      {currentDate === rearrangedDate && (
                        <Star className="movie-star">
                          &#9733;
                          <StarToolTip>
                            {display_title ? (
                              <span
                                style={{
                                  borderBottom: " 1px solid #fff7",
                                  fontStyle: "italic",
                                }}
                              >
                                {display_title}
                              </span>
                            ) : (
                              "This movie"
                            )}{" "}
                            was just added today
                          </StarToolTip>
                        </Star>
                      )}
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
                        <span
                          style={{ font: "500 1rem barlow", color: "#000" }}
                        >
                          {rearrangedDate}
                        </span>
                      </Date>

                      <Snapshot>Snapshot:</Snapshot>
                      <MovieSnapshot
                        src={multimedia && multimedia.src}
                        alt={display_title}
                      />

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
    </div>
  );
}
