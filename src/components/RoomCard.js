import React from "react";
import "./RoomCard.css";

function RoomCard({ room }) {
  console.log(room);
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src="..." class="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{room.name}</h2>
            <p className="card-title">{room.location}</p>
            <p className="cart-title"> 150m od centra </p>
            <p className="cart-title"> Tip: Apartman klasika </p>

            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
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
