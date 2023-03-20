import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../actions";
import ReservationForm from "../forms/ReservationForm";
import ImageCarousel from "../ImageCarousel";
import MapModal from "../modals/MapModal";
import { getRoomKeys, arrayChecks } from "../../utils/roomCheckData";
import Star from "react-star-review";
import EvaluationForm from "../forms/EvaluationForm";
import { auth } from "../../config/firebase";
import RoomReviews from "../RoomReviews";

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
    let keys = getRoomKeys(room);
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

  let rating =
    props.room.reviews.reduce((acc, rev) => {
      return (
        acc +
        (rev.evalLocation +
          rev.evalStuff +
          rev.evalClean +
          rev.evalThings +
          rev.evalPrice +
          rev.evalComfor) /
          6
      );
    }, 0) / props.room.reviews.length;
  rating = Math.round(rating * 100) / 100;

  return (
    <div>
      <MapModal
        isOpen={isMapModalOpen}
        setIsOpen={setIsMapModalOpen}
        address={`${props.room.address}, ${props.room.location}`}
        center={props.room.cords}
      ></MapModal>
      <div style={{ position: "relative" }}>
        <div
          title={`Ocena: ${rating}`}
          style={{ position: "absolute", top: "20px", right: "10px" }}
        >
          <Star rating={rating} />
        </div>
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
      </div>
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
        <RoomReviews reviews={props.room.reviews} />
        <hr />
        {auth.currentUser ? (
          <div>
            <EvaluationForm />
            <hr />
          </div>
        ) : (
          ""
        )}
      </div>
      <ReservationForm room={props.room}></ReservationForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { room: state.room };
};

export default connect(mapStateToProps, { getRoomById })(RoomPage);
