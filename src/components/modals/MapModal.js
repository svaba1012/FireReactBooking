import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const customStyles = {
  overlay: {
    zIndex: 2000,
  },
  content: {
    zIndex: 2100,
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
  },
};

function MapModal({ isOpen, setIsOpen, address, center = [51.505, -0.09] }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        ref={setMap}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    ),
    []
  );

  const closeModal = () => setIsOpen(false);
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      //   className="modal"
    >
      <div
        onClick={closeModal}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 3000,
          cursor: "pointer",
        }}
      >
        <i
          class="fa-solid fa-circle-xmark"
          style={{ color: "red", fontSize: "xxx-large" }}
        ></i>
      </div>
      {displayMap}
    </Modal>
  );
}

export default MapModal;
