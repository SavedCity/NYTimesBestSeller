import { Card, CardHeader } from "@mui/material";
import React from "react";

export default function Books(props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {props.usersData.lists.map((book) => {
        return (
          <div>
            <Card key={book.list_id} sx={{ m: "5px" }} variant="outlined">
              <CardHeader sx={{ bgcolor: "#0001" }} title={book.list_name} />
            </Card>
          </div>
        );
      })}
    </div>
  );
}
