import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import axios from "axios";

const CardContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 0 20px;
  align-items: center;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 60px;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #0006;
  background: #fff;
  padding: 4px 4px 4px 10px;
  font: 300 1rem barlow;
  box-shadow: 3px 3px 5px #0003;
  outline-color: #28282899;
  margin-left: 60px;
`;

const Title = styled.h1`
  font: 500 1.3rem sen;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #0003;
  padding-bottom: 10px;
  color: #6e090b;
`;

const Rating = styled.h4`
  font: 400 1rem barlow;
  margin: 0;
  color: #0009;
`;

const Date = styled.h5`
  font: 300 1rem barlow;
`;

const Summary = styled.h5`
  font: 500 1rem barlow;
`;

// const MovieLink = styled.a`
//   margin: 8px;
//   font-size: 1rem;
//   text-decoration: none;
//   color: black;
// `;

// const Image = styled.img`
//   height: 180px;
//   width: 200px;
//   border-radius: 40px;
// `;

export default function Categories() {
  const [movies, setMovies] = useState([]);
  const loading = useSelector((state) => state.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShown, setIsShown] = useState(false);

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

  return (
    <div>
      {!loading ? (
        <>
          <CardContainerHeader>
            <SearchInput
              type="text"
              placeholder="Search movie titles..."
              onChange={async (e) => {
                await setSearchTerm(e.target.value);
                highlightTitle(e);
              }}
            />
          </CardContainerHeader>
          <MovieContainer>
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
                  mpaa_rating,
                  // link,
                } = category;
                console.log(category);
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

                return (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      flex: "1",
                      flexBasis: "20%",
                      justifyContent: "space-around",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "80%",
                        padding: "20px",
                        border: "2px solid #6e090b33",
                        boxShadow: "4px 4px #6e090b33",
                      }}
                    >
                      {/* <MovieLink target="_blank " href={link.url}> */}
                      <Title id={display_title}>{display_title}</Title>
                      {/* </MovieLink> */}
                      {/* <Image src="movie.jpeg"></Image> */}
                      {rating ? (
                        <Rating>
                          Rated{" "}
                          <span
                            style={
                              rating === "R"
                                ? {
                                    color: "#a10000",
                                    font: " 600 1rem barlow",
                                    marginLeft: "5px",
                                    borderRadius: "4px",
                                    background: "#0001",
                                    padding: "5px 10px",
                                  }
                                : rating === "PG"
                                ? {
                                    color: "#023e8a",
                                    font: " 600 1rem barlow",
                                    marginLeft: "5px",
                                    borderRadius: "4px",
                                    background: "#0001",
                                    padding: "5px 6px",
                                  }
                                : rating === "PG13"
                                ? {
                                    color: "#007200",
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
                        <span style={{ font: "500 1rem barlow" }}>
                          {rearrangedDate}
                        </span>
                      </Date>
                      <Summary
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                      >
                        Description
                      </Summary>
                      {isShown && <Summary>{summary_short}</Summary>}
                    </div>
                  </div>
                );
              })}
          </MovieContainer>
        </>
      ) : (
        <div className="loader-div">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
