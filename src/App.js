import "./App.css";

import axios from "axios";

import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Categories from "./components/BookCategories";
import IdPage from "./components/idpage";

import { setCategories, setLoading } from "./redux/actions/actions";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

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
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/bookscategory">Books Category</Link>
      </div>
      <Routes>
        <Route path="/bookscategory" element={<Categories />}></Route>
        <Route path="/bookscategory/:idpage" element={<IdPage />}></Route>
      </Routes>
    </Router>
  );
}
