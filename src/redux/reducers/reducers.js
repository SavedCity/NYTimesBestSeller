import { ActionTypes } from "../constants/action_types";

const initialState = {
  bookCategories: [],
};

export const bookCategoriesReducer = (
  state = initialState.bookCategories,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_BOOK_CATEGORIES:
      return payload;

    default:
      return state;
  }
};

export const loadingReducer = (state = true, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LOADING:
      return payload;

    default:
      return state;
  }
};