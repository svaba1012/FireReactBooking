import React, { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapLocationMarker.css";
import { Marker } from "react-leaflet";
import { useForm } from "react-final-form";
import { useSelector } from "react-redux";
const center = [51.505, -0.09];
const zoom = 13;

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
      <button onClick={onClick}>reset</button>
    </p>
  );
}

function MapLocationMarker(props) {
  const [map, setMap] = useState(null);

  const { change } = useForm();
  const onMove = useCallback(() => {
    change("cords", map.getCenter());
  }, [map]);

  const centerSelector = useSelector((state) => state.mapCenter);

  useEffect(() => {
    if (map) {
      map.setView(!props.center[0] ? center : props.center, zoom);
    }
  }, [centerSelector]);

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
      map.on("move", onMove);
      return () => {
        map.off("move", onMove);
      };
    }
  }, [map, onMove]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={!props.center[0] ? center : props.center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
        style={{ height: "50vh", width: "40vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    ),
    []
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "19vh",
          left: "19vw",
          zIndex: 1000,
        }}
      >
        <i
          className="fa-solid fa-location-dot"
          style={{ color: "blue", fontSize: "6vh" }}
        ></i>
      </div>
      {/* {map ? <DisplayPosition map={map} /> : null} */}
      {displayMap}
    </div>
  );
}

export default MapLocationMarker;
