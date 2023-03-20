import React, { useEffect, useState } from "react";
import "./RoomCard.css";
import { getRoomKeysCard, arrayChecksCard } from "../utils/roomCheckData";

const getRoomIcons = (room) => {
  let keys = getRoomKeysCard(room);
  return keys.map((key, id) => {
    if (!arrayChecksCard[key].icon) {
      return <span></span>;
    }
    return (
      <span
        key={id}
        style={{ margin: "4px" }}
        data-toggle="tooltip"
        data-placement="bottom"
        title={arrayChecksCard[key].text}
      >
        {arrayChecksCard[key].icon}
      </span>
    );
  });
};

const getRatingText = (rating) => {
  if (rating >= 4.5) {
    return "Izvanredan";
  } else if (rating >= 4) {
    return "Odlican";
  } else if (rating >= 3) {
    return "Vrlo dobar";
  } else if (rating >= 2) {
    return "Dobar";
  } else if (rating >= 1) {
    return "Dovoljan";
  } else {
    return "Los";
  }
};

function RoomCard({ room }) {
  let [icons, setIcons] = useState(null);
  let [filter, setFilter] = useState(null);
  useEffect(() => {
    setIcons(getRoomIcons(room));
    setFilter(5);
  }, []);

  if (!icons || !filter) {
    return <div></div>;
  }

  return (
    <div className="card mb-3" style={{ cursor: "pointer" }}>
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
              <div>
                Pogodnosti:
                {icons.filter((el, id) => id < filter)}
                {icons.length > 5 ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      if (filter === 5) setFilter(20);
                      else {
                        setFilter(5);
                      }
                    }}
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                  >
                    ...
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p> */}
            <div className="card-text">
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
              {room.reviews.rating ? (
                <div className="score bg-dark">
                  <div className="score-desc">
                    <div>{getRatingText(room.reviews.rating)}</div>{" "}
                    <div>{room.reviews.count} recenzija</div>
                  </div>
                  <div className="score-num">{room.reviews.rating}</div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
