import React from "react";
import ReviewCard from "./ReviewCard";

function ReviewsCarousel(props) {
  return (
    <div
      id={props.id}
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "30px" }}
    >
      <div className="carousel-inner ">
        {props.reviews.map((review, id) => {
          let active = "";
          if (id === 0) {
            active = " active ";
          }
          return (
            <div className={"carousel-item" + active} key={id}>
              <ReviewCard review={review} />
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${props.id}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${props.id}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ReviewsCarousel;
