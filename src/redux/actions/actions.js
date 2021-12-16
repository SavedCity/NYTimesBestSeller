import { ActionTypes } from "../constants/action_types";

export const setCategories = (categories) => {
  return {
    type: ActionTypes.SET_BOOK_CATEGORIES,
    payload: categories,
  };
};

export const removeSelectedCategory = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_BOOK_CATEGORY,
  };
};

export const selectedBooks = (books) => {
  return {
    type: ActionTypes.SELECTED_BOOKS,
    payload: books,
  };
};

export const setLoading = (loading) => {
  return {
    type: ActionTypes.SET_LOADING,
    payload: loading,
  };
};
