import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  max-height: 0px;
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
        "https://api.nytimes.com/svc/movies/v2/critics/all.json?api-key=B96BsMyHZskb1xX0KJMMsfVweArZ2Q8f"
      )
      .catch((err) => {
        console.log(err);
      });
    setCategories(response.data.results);
  };
  // console.log(categories);

  const resetDropDown = () => {
    const dropDown = document.getElementById("sorting-option");
    dropDown.selectedIndex = 0;
  };

  return (
    <div>
      <CategoryContainer id="movies-category-container">
        {!loading ? (
          <>
            {categories
              .sort((a, b) =>
                a.display_name > b.display_name
                  ? 1
                  : b.display_name > a.display_name
                  ? -1
                  : 0
              )
              .map((category, key) => {
                const { display_name } = category;

                return (
                  <CategoryBox key={key}>
                    <CategoryLink onClick={resetDropDown} to={display_name}>
                      {display_name}
                    </CategoryLink>
                  </CategoryBox>
                );
              })}
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
