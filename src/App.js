import "./App.css";

import axios from "axios";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Categories from "./components/BookCategories";

import { setCategories, setLoading } from "./redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  // const [loading, setLoading] = useState(true);
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBookCategories();
  }, []);

  const fetchBookCategories = async () => {
    const response = await axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=FGuAAGxWuiRNhKjRZsrPKUUiSbtOJUG1"
      )
      .catch((err) => {
        console.log(err);
      });
    dispatch(setLoading(false));
    dispatch(setCategories(response.data.results.lists));
  };

  return (
    <div className="App">
      <Categories />
    </div>
  );
}
