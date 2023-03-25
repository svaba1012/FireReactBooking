import React, { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapLocationMarker.css";
import { useForm } from "react-final-form";
import { useSelector } from "react-redux";
const center = [51.505, -0.09];
const zoom = 13;

function MapLocationMarker(props) {
  const [map, setMap] = useState(null);

  const { change } = useForm();
  const onMove = useCallback(() => {
    change("cords", map.getCenter());
  }, [map]);

  const centerSelector = useSelector(
    (state) => state.mapCenter,
    (oldVal, newVal) => oldVal.formatted === newVal.formatted
  );

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
