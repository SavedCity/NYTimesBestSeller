import { Card, CardHeader } from "@mui/material";
import React from "react";

export default function Books(props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {props.booksData.lists.map((book) => {
        return (
          <div key={book.list_id}>
            <Card sx={{ m: "5px" }} variant="outlined">
              <CardHeader sx={{ bgcolor: "#0001" }} title={book.list_name} />
            </Card>
          </div>
        );
      })}
    </div>
  );
}
