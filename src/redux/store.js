import { createStore, combineReducers } from "redux";
import { bookCategoriesReducer, loadingReducer } from "./reducers/reducers";

const store = createStore(
  combineReducers({
    allBookCategories: bookCategoriesReducer,
    loading: loadingReducer,
  }),
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
