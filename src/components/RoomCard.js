import React from "react";
import "./RoomCard.css";

function RoomCard({ room }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={room.mainPicUrl}
            className="img-fluid rounded-start"
            alt="..."
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{room.name}</h2>
            <p className="card-title">
              <i className="fa-solid fa-location-dot"></i> {room.address},{" "}
              {room.location}
            </p>
            <div className="cart-text">
              {" "}
              <div>Tip: {room.type}</div>
              <div> Maksimalan broj osoba: {room.numOfPeople} </div>
              <div>
                Povrsina: {room.area} m<sup>2</sup>
              </div>
            </div>

            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
              <div className="score">
                <div className="score-desc">
                  <div>Izvanredan</div> <div>88 recenzija</div>
                </div>{" "}
                <div className="score-num">10.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
