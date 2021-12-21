import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const CategoryBox = styled.div`
  margin: 10px 0px;
`;

const CategoryLink = styled(Link)`
  color: #282828;
  font-size: 1.2rem;
  text-decoration: none;
  background: #0001;
  border-radius: 3px;
  padding: 5px 10px;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    background: #0002;
  }
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
  console.log(categories);

  const resetDropDown = () => {
    const dropDown = document.getElementById("sorting-option");
    dropDown.selectedIndex = 0;
  };

  return (
    <div>
      <CategoryContainer>
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
