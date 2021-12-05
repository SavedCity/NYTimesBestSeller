import { Card, CardHeader, CardMedia } from "@mui/material";
import React from "react";

export default function User(props) {
  return (
    <div style={{ display: "flex" }}>
      {props.usersData.map((user) => {
        return (
          <div>
            <Card
              key={user.id}
              sx={{ maxWidth: 345, m: "50px auto" }}
              variant="outlined"
            >
              <CardHeader sx={{ bgcolor: "#0001" }} title={user.firstName} />
              <CardMedia
                component="img"
                sx={{ width: 150, float: "right" }}
                image={user.picture}
              />
            </Card>
          </div>
        );
      })}
    </div>
  );
}
