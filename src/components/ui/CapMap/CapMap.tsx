import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

import carIconUrl from "../../../assets/car-icon.svg";
import { CarType } from "../../../plugins/axios/axios";

type CarsMapProps = {
  carsData: CarType[];
};

const carIcon = new L.Icon({
  iconUrl: carIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const CarsMap = React.memo((props: CarsMapProps) => {
  const defaultPosition: LatLngExpression = [55.751244, 37.618423];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.carsData.map((car) => (
        <Marker
          key={car.id}
          position={[car.latitude, car.longitude]}
          icon={carIcon}
        >
          <Popup>
            <strong>{car.name}</strong>
            <br />
            Model: {car.model}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default CarsMap;
