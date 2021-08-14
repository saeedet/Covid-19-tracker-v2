import { Card, CardMedia, CardContent } from "@material-ui/core";
import React from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "./utils";
import { Map as MapContainer, TileLayer } from "react-leaflet";
import { useContextProvider } from "../contextAPI/StateProvider";

function Map() {
  const [{ map_info, selected_view, map_options }] = useContextProvider();
  return (
    <Card
      className="map"
      style={{ backgroundColor: `var(--${selected_view}-theme)` }}
    >
      <CardContent>
        <CardMedia className="map__containerWrapper">
          <MapContainer
            center={map_options.center}
            zoom={map_options.zoom}
            className="map__container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {map_info && showDataOnMap(map_info, selected_view)}
          </MapContainer>
        </CardMedia>
      </CardContent>
    </Card>
  );
}

export default Map;
