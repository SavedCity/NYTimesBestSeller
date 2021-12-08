import "./App.css";

import axios from "axios";

import React, { useEffect } from "react";

import LeftSideMenu from "./components/LeftSideMenu";

import { setCategories, setLoading } from "./redux/actions/actions";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBookCategories();
    // eslint-disable-next-line
  }, []);

  const fetchBookCategories = async () => {
    const response = await axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=FGuAAGxWuiRNhKjRZsrPKUUiSbtOJUG1"
      )
      .catch((err) => {
        console.log(err);
      });
    dispatch(setCategories(response.data.results.lists));
    dispatch(setLoading(false));
  };

  return (
    <div className="App">
      <LeftSideMenu />
    </div>
  );
}
