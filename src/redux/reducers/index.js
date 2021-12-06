import { combineReducers } from "redux";
import { bookReducer } from "./book_reducer";

const reducer = combineReducers({
  allBooks: bookReducer,
});

export default reducer;
