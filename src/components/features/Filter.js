import React from "react";
import {
  FilterTitle,
  FilterContainer,
  FilterLabel,
  FilterInput,
  Checkmark,
} from "../movies/MoviesStyle";

export default function Filter({ movieRatings, filterCheckbox }) {
  return (
    <FilterContainer>
      <FilterTitle>Filter</FilterTitle>
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
                onChange={(e) => {
                  filterCheckbox(e.target);
                }}
                value={rating}
                id={"rated-" + rating}
                type="checkbox"
                className="rating-checkbox"
              />
              <Checkmark className="checkmark"></Checkmark>
            </FilterLabel>
          );
        })}
    </FilterContainer>
  );
}
