import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import Categories from "./components/Categories";

function App() {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=FGuAAGxWuiRNhKjRZsrPKUUiSbtOJUG1"
      )
      .then((response) => {
        const booksData = response.data.results;
        setBooksData(booksData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" />
          <Route path="/category/:categoryId" />
        </Routes>
        {!loading ? <Books booksData={booksData} /> : <h1>LOADING...</h1>}
        <Categories loading={loading} booksData={booksData} />
      </Router>
    </div>
  );
}

export default App;
