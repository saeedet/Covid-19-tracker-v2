import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useContextProvider } from "../contextAPI/StateProvider";
import "./Header.css";

function Header() {
  const [{ countries }, dispatch] = useContextProvider();
  const [view, setView] = useState("worldwide");

  const selectChangeHandler = async (e) => {
    setView(e.target.value);
    dispatch({
      type: "SET_COUNTRY_VIEW",
      selected_country: e.target.value,
    });
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_VIEW_INFO",
          view_info: data,
        });
        let mapOptions;
        if (countryCode === "worldwide") {
          mapOptions = {
            center: [51.505, -0.09],
            zoom: 2,
          };
        } else {
          mapOptions = {
            center: [data.countryInfo.lat, data.countryInfo.long],
            zoom: 3,
          };
        }

        console.log(mapOptions);
        dispatch({
          type: "SET_MAP_OPTIONS",
          map_options: mapOptions,
        });
      });
  };
  return (
    <div className="header">
      <h1 className="header__title">COVID-19 Tracker</h1>
      <FormControl>
        <Select
          value={view}
          onChange={selectChangeHandler}
          variant="outlined"
          className="header__options"
        >
          <MenuItem value="worldwide" selected>
            Worldwide
          </MenuItem>
          <FormHelperText className="header__optionsHelperText">
            Select Country
          </FormHelperText>
          {countries &&
            countries.map((country, index) => (
              <MenuItem value={country.value} key={`${country.name}-${index}`}>
                {country.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
