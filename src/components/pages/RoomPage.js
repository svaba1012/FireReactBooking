import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../actions";
import ReservationForm from "../forms/ReservationForm";
import ImageCarousel from "../ImageCarousel";
import MapModal from "../modals/MapModal";

const arrayChecks = {
  klima: { icon: <i className="fa-solid fa-fan"></i>, text: "Klima" },
  grejanje: {
    icon: <i className="fa-solid fa-fire-flame-curved"></i>,
    text: "Grejanje",
  },
  wifi: {
    icon: <i className="bi bi-wifi"> </i>,
    text: "Wi-fi",
  },
  parking: {
    text: "Parking",
    icon: <i className="bi bi-p-square-fill"></i>,
  },

  kuhinja: {
    text: "Kuhinja",
    icon: <i className="fa-solid fa-kitchen-set"></i>,
  },
  cajnaKuhinja: {
    icon: <i className="bi bi-cup-hot-fill"></i>,
    text: "Cajna kuhinja",
  },
  vesMasina: {
    icon: <i className="fa-solid fa-shirt"></i>,
    text: "Ves masina",
  },
  tv: { text: "TV", icon: <i className="bi bi-tv-fill"></i> },
  sauna: {
    icon: <i className="fa-solid fa-hot-tub-person"></i>,

    text: "Sauna",
  },
  miniBar: {
    icon: <i className="fa-solid fa-martini-glass-citrus"></i>,
    text: "Mini-bar",
  },
  djakuzi: {
    icon: <i className="fa-solid fa-hot-tub-person"></i>,
    text: "Djakuzi",
  },
  terasa: { text: "Terasa" },
  dvoriste: { text: "Dvoriste" },
  engleski: { text: "Engleski" },
  nemacki: { text: "Nemacki" },
  srpski: { text: "Srpski" },
  pusenje: {
    icon: <i className="fa-solid fa-smoking"></i>,
    text: "Dozvoljeno pusenje",
  },
  ljubimci: {
    icon: <i className="fa-solid fa-dog"></i>,
    text: " Dozvoljen boravak kucnih ljubimaca",
  },
  dogadjaji: {
    icon: <i className="fa-solid fa-champagne-glasses"></i>,
    text: "Dozvoljene zurke/dogadjaji",
  },
  numOfBracni: {
    icon: <i className="fa-solid fa-bed"></i>,
    text: "Bracni krevet",
  },
  numOfObican: {
    icon: <i className="fa-solid fa-bed"></i>,
    text: "Obican krevet",
  },
  numOfKauc: { icon: <i className="fa-solid fa-bed"></i>, text: "Kauc" },
  numOfBathrooms: {
    icon: <i className="fa-solid fa-shower"></i>,
    text: "Kupatila",
  },
};

const intersect = (array1, array2) =>
  array1.filter((value) => array2.includes(value));

function RoomPage(props) {
  let params = useParams();
  useEffect(() => {
    props.getRoomById(params.id);
  }, []);
  let [isMapModalOpen, setIsMapModalOpen] = useState(false);
  if (!props.room.id) {
    return <div></div>;
  }

  const getCards = (room) => {
    let keys = intersect(Object.keys(room), Object.keys(arrayChecks));
    return keys.map((key, id) => {
      return (
        <div
          key={id}
          style={{
            display: "flex",
            margin: "5px",
          }}
        >
          <div className="card">
            <div className="card-body">
              <h3>
                {arrayChecks[key].icon} {arrayChecks[key].text}{" "}
                {typeof room[key] === "boolean" ? (
                  ""
                ) : (
                  <span>x {room[key]}</span>
                )}
              </h3>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <MapModal
        isOpen={isMapModalOpen}
        setIsOpen={setIsMapModalOpen}
        address={`${props.room.address}, ${props.room.location}`}
        center={props.room.cords}
      ></MapModal>
      <h2>{props.room.name}</h2>
      <h5
        onClick={() => {
          setIsMapModalOpen(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-geo-alt-fill"></i>
        {props.room.address}, {props.room.location} - Prikazi mapu
      </h5>
      <ImageCarousel
        id="imageSlide"
        images={props.room.imagesUrl}
      ></ImageCarousel>
      <div style={{ marginTop: "200px" }}>
        <hr />
        <div
          style={{
            display: "flex",

            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "5px",
            }}
          >
            <div className="card">
              <div className="card-body">
                <h3>
                  <i className="fa-solid fa-user"></i> Maksimalan broj gostiju:{" "}
                  {props.room.numOfPeople}
                </h3>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "5px",
            }}
          >
            <div className="card">
              <div className="card-body">
                <h3>
                  <i className="fa-solid fa-house-chimney"></i> Povrsina:{" "}
                  {props.room.area} m<sup>2</sup>
                </h3>
              </div>
            </div>
          </div>
          {getCards(props.room)}
        </div>
        <hr />
        <p className="lead">{props.room.description}</p>
        <hr />
      </div>
      <ReservationForm room={props.room}></ReservationForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { room: state.room };
};

export default connect(mapStateToProps, { getRoomById })(RoomPage);
