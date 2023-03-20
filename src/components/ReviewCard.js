import React from "react";
import { formatDistanceToNow } from "date-fns";
import Star from "react-star-review";

function getAverage(rev) {
  return (
    Math.round(
      ((rev.evalLocation +
        rev.evalStuff +
        rev.evalClean +
        rev.evalThings +
        rev.evalPrice +
        rev.evalComfor) /
        6) *
        100
    ) / 100
  );
}

function ReviewCard(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="card mb-3" style={{ maxWidth: "70%", minWidth: "60%" }}>
        <div className="row g-0">
          <div className="col-md-1">
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "1rem" }}
            >
              <img
                src={props.review.user.pic}
                className="img-fluid"
                alt="..."
                style={{ borderRadius: "50%", width: "3rem" }}
              />
            </div>
          </div>
          <div className="col-md-10">
            <div className="card-body">
              <div>{props.review.user.name}</div>
              <div>{props.review.evalDesc}</div>
              <small className="text-muted">
                {formatDistanceToNow(new Date(props.review.date * 1000))} ago
              </small>
              <div
                title={`Ocena: ${getAverage(props.review)}`}
                style={{ position: "absolute", bottom: "10px", right: "10px" }}
              >
                <Star size={20} rating={getAverage(props.review)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
