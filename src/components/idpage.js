import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

export default function IdPage() {
  const [bookList, setBookList] = useState([]);

  const loading = useSelector((state) => state.loading);
  console.log(bookList);
  useEffect(() => {
    fetchBookList();
    // eslint-disable-next-line
  }, []);
  let params = useParams();
  let newParams = params.idpage.replace(/\s/g, "-");
  const fetchBookList = async () => {
    const response = await axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists.json?list=${newParams}&api-key=FGuAAGxWuiRNhKjRZsrPKUUiSbtOJUG1`
      )
      .catch((err) => {
        console.log(err);
      });
    setBookList(response.data.results);
  };

  return (
    <div>
      {!loading ? (
        <>
          {bookList.map((books) => {
            console.log(books);

            return (
              <div>
                <h3>{books.book_details[0].title}</h3>
              </div>
            );
          })}
        </>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
}
