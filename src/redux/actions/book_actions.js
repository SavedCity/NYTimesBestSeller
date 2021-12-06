import { ActionTypes } from "..contants/action_types";

export const setBooks = (books) => {
  return {
    type: ActionTypes.SET_BOOKS,
    payload: books,
  };
};

export const selectedBooks = (books) => {
  return {
    type: ActionTypes.SELECTED_BOOKS,
    payload: books,
  };
};
