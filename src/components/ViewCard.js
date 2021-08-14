import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useContextProvider } from "../contextAPI/StateProvider";
import { prettyPrintStat } from "./utils";
import "./ViewCard.css";

function ViewCard({ title, cases, total, color }) {
  const [{ selected_view }, dispatch] = useContextProvider();
  const clickHandler = () => {
    dispatch({
      type: "SET_VIEW",
      selected_view: title,
    });
  };
  let styles;
  if (selected_view === title) {
    styles = {
      borderTop: "5px solid",
      borderColor: color,
    };
  }

  return (
    <Card style={styles} className="viewCard" onClick={clickHandler}>
      <CardContent>
        <Typography
          color="textSecondary"
          variant="subtitle1"
          className="viewCard__item viewCard__title"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          className="viewCard__item viewCard__cases"
          style={{ color: color }}
        >
          +{prettyPrintStat(cases)}
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
          className="viewCard__item viewCard__total"
        >
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ViewCard;
