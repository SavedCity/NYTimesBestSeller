import "./App.css";

import axios from "axios";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Categories from "./components/BookCategories";

import { setCategories } from "./redux/actions/category_actions";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const [loading, setLoading] = useState(true);

  const categories = useSelector((state) => state.allBookCategories.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=FGuAAGxWuiRNhKjRZsrPKUUiSbtOJUG1"
      )
      .catch((err) => {
        console.log(err);
      });
    dispatch(setCategories(response.data.results.lists));
    setLoading(false);
  };

  return (
    <div className="App">
      <Categories loading={loading} />
    </div>
  );
}
