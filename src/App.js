import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

import User from "./components/User";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get("https://dummyapi.io/data/v1/user?limit=50", {
        headers: {
          "app-id": "61acd21ffa68b81b9f9f9b58",
        },
      })
      .then((response) => {
        setUsersData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!loading) {
    console.log(usersData);
  }

  return (
    <div className="App">
      {!loading ? <User usersData={usersData} /> : <h1>LOADING...</h1>}
    </div>
  );
}

export default App;
