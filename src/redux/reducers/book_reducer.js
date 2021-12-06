import { ActionTypes } from "../constants/action_types";

const initialState = {
  books: [
    {
      id: 1,
      title: "book_1",
      category: "none",
    },
  ],
};

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BOOKS:
      return state;

    default:
      return state;
  }
};
