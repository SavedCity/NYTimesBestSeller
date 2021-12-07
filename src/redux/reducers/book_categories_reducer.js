import { ActionTypes } from "../constants/action_types";

const initialState = {
  bookCategories: [],
};

export const bookCategoriesReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_BOOK_CATEGORIES:
      return { ...state, categories: payload };

    default:
      return state;
  }
};
