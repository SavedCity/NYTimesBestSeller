import React, { useEffect, useState } from "react";

import axios from "axios";

import SortMovies from "../features/SortMovies";
import Filter from "../features/Filter";

import {
  CardContainerHeader,
  ResultsLength,
  MagnifyingGlass,
  SearchInput,
  MovieContainer,
  Card,
  Title,
  Star,
  StarToolTip,
  Rating,
  Date,
  Snapshot,
  MovieSnapshot,
  DescriptionButton,
  SummaryBox,
  Summary,
  PaginateBtn,
  GrayedOutBtn,
  PaginationContainer,
  BackToTop,
} from "./MoviesStyle";

export default function Categories() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentSortingButton, setCurrentSortingButton] = useState(
    "Sort By: Date: New to Old"
  );

  const [offset, setOffset] = useState(0);
  const [moreData, setMoreData] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [buttonIndex, setButtonIndex] = useState(0);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    if (filters.length !== 0) {
      setFilteredMovies(
        movies.filter((movie) =>
          filters.some((category) =>
            [movie.mpaa_rating].flat().includes(category)
          )
        )
      );
    } else {
      fetchMovieCategories();
      setFilteredMovies(movies);
    }
    // eslint-disable-next-line
  }, [filters, offset]);

  const fetchMovieCategories = async () => {
    const url = `https://api.nytimes.com/svc/movies/v2/reviews/all.json?offset=${offset}&api-key=B96BsMyHZskb1xX0KJMMsfVweArZ2Q8f`;

    const response = await axios.get(url).catch((err) => {
      console.log(err);
      setError(true);
    });
    setLoading(false);
    // if (filteredMovies.length === 0) {
    setFilteredMovies(response.data.results);
    // }
    setMovies(response.data.results);
    setMoreData(response.data.has_more);

    const addDataIntoCache = () => {
      // Converting our respons into Actual Response form
      const data = new Response(JSON.stringify(response.data.results));
      if ("caches" in window) {
        // Opening given cache and putting our data into it
        caches.open("cacheMovieData").then((cache) => {
          cache.put(url, data);
          // console.log("MovieData Added into cache!");
          // console.log(caches);x
        });
      }
    };
    addDataIntoCache();
  };

  const clearSorting = () => {
    let sortButton = document.getElementById("sort-button");
    if (currentSortingButton !== "Sort By: Date: New to Old") {
      setCurrentSortingButton("Sort By: Date: New to Old");
    }
    if (sortButton !== null) {
      sortButton.innerHTML = "Sort By: Date: New to Old";
    }
  };

  const clearFilter = () => {
    let checkbox = document.getElementsByClassName("rating-checkbox");
    checkbox.checked = false;
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    setFilters([]);
  };

  // Highlight the typed letters on the title if they match
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
  const currentDate = `${currentAbbMonth} ${rawDate
    .getDate()
    .toString()
    .padStart(2, "0")}, ${rawDate.getFullYear()}`;

  const filterCheckbox = (eTarget) => {
    if (eTarget.checked) {
      setFilters([...filters, eTarget.value]);
    } else {
      setFilters(filters.filter((id) => id !== eTarget.value));
    }
    clearSorting();
  };

  // Only unique values for movie ratings
  const movieRatings = [...new Set(movies.map((q) => q.mpaa_rating))];

  function range(start, end) {
    /* generate a range : [start, start+1, ..., end-1, end] */
    let len = end - start + 1;
    let a = new Array(len);
    for (let i = 0; i < len; i++) a[i] = start + i;
    return a;
  }
  // Pagination functions
  function changeRangeHigh() {
    setStart(start + 5);
    setEnd(end + 5);
  }

  function changeRangeLow() {
    setStart(start - 5);
    setEnd(end - 5);
  }

  const paginateNext = () => {
    if (offset >= 0) {
      clearFilter();
      setOffset(offset + 20);
      setButtonIndex(buttonIndex + 1);
      clearSorting();
    }
  };

  const paginateNumbers = async (e, button) => {
    clearFilter();
    setOffset(e.target.value * 20);
    setButtonIndex(button);
    setSearchTerm("");
    clearSorting();
  };

  const paginateBack = () => {
    if (offset > 0) {
      clearFilter();
      setOffset(offset - 20);
      setButtonIndex(buttonIndex - 1);
      clearSorting();
    }
  };

  window.onscroll = () => {
    let topBtn = document.querySelector(".back-to-top");
    if (window.pageYOffset > 400 && topBtn !== null) {
      topBtn.classList.add("show");
      console.log("works");
    } else {
      if (topBtn !== null) {
        topBtn.classList.remove("show");
      }
    }
  };

  if (error) return <h2>DATA ERROR</h2>;

  return (
    <div id="top" style={{ width: "100%" }}>
      <CardContainerHeader>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "6vw" }}
        >
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
                await highlightTitle(e);
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <SortMovies
          setFilteredMovies={setFilteredMovies}
          filteredMovies={filteredMovies}
          currentSortingButton={currentSortingButton}
          setCurrentSortingButton={setCurrentSortingButton}
        />
      </CardContainerHeader>
      <div style={{ display: "flex" }}>
        <Filter movieRatings={movieRatings} filterCheckbox={filterCheckbox} />
        {!loading ? (
          <div style={{ width: "100%", position: "relative" }}>
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
                                  // borderBottom: " 1px solid #fff7",
                                  fontStyle: "italic",
                                }}
                              >
                                {display_title}
                              </span>
                            ) : (
                              "This movie"
                            )}{" "}
                            was released today
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
            <PaginationContainer>
              {true ? (
                <PaginateBtn onClick={paginateBack}>PREVIOUS</PaginateBtn>
              ) : (
                <GrayedOutBtn>PREVIOUS</GrayedOutBtn>
              )}

              {start > 0 ? (
                <PaginateBtn
                  style={{
                    padding: "0px 10px 20px 10px",
                    margin: "0 5px",
                    height: "20px",
                    fontWeight: "800",
                    letterSpacing: "2px",
                  }}
                  onClick={changeRangeLow}
                >
                  ...
                </PaginateBtn>
              ) : (
                <GrayedOutBtn
                  style={{
                    padding: "0px 10px 20px 10px",
                    margin: "0 5px",
                    height: "20px",
                    fontWeight: "800",
                    letterSpacing: "2px",
                  }}
                >
                  ...
                </GrayedOutBtn>
              )}

              {range(start, end).map((button, index) => {
                return (
                  <button
                    key={index}
                    className={
                      buttonIndex === button
                        ? "pagButtonActive"
                        : "pagButtonInactive"
                    }
                    onClick={(e) => paginateNumbers(e, button)}
                    value={button}
                    id={button}
                  >
                    {button + 1}
                  </button>
                );
              })}

              {moreData ? (
                <PaginateBtn
                  style={{
                    padding: "0px 10px 20px 10px",
                    margin: "0 5px",
                    height: "20px",
                    fontWeight: "800",
                    letterSpacing: "2px",
                  }}
                  onClick={changeRangeHigh}
                >
                  ...
                </PaginateBtn>
              ) : (
                <GrayedOutBtn
                  style={{
                    padding: "0px 10px 20px 10px",
                    margin: "0 5px",
                    height: "20px",
                    fontWeight: "800",
                    letterSpacing: "2px",
                  }}
                >
                  ...
                </GrayedOutBtn>
              )}

              {moreData && (
                <PaginateBtn onClick={paginateNext}>NEXT</PaginateBtn>
              )}
            </PaginationContainer>
            <BackToTop className="back-to-top" href="#top"></BackToTop>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
}
