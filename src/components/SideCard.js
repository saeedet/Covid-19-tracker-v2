import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from "numeral";
import React from "react";
import { useContextProvider } from "../contextAPI/StateProvider";
import Graph from "./Graph";
import "./SideCard.css";

function SideCard() {
  const [{ table_info }] = useContextProvider();

  return (
    <Card className="sideCard">
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Live Cases by Country
        </Typography>
        <div className="sideCard__table">
          <table>
            <tbody>
              {table_info &&
                table_info.map((country, index) => (
                  <tr key={`key-${index}`}>
                    <td>{country.country}</td>
                    <td>
                      <strong>{numeral(country.cases).format("0,0")}</strong>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Graph />
      </CardContent>
    </Card>
  );
}

export default SideCard;
