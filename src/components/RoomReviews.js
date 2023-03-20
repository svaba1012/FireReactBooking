import React from "react";
import Star from "react-star-review";
import ReviewsCarousel from "./ReviewsCarousel";

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

function RoomReviews(props) {
  if (!props.reviews || props.reviews.length === 0) {
    return <div></div>;
  }
  return (
    <div>
      <div>
        <h3 style={{ textAlign: "center" }}>Ocene i iskustva gostiju</h3>
        <div className="row">
          <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-center">
              <div>
                <label>Osoblje</label>
                <Star
                  rating={average(props.reviews.map((el) => el.evalStuff))}
                />
              </div>
            </div>
          </div>

          <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-center">
              <div>
                <label>Lokacija</label>
                <Star
                  rating={average(props.reviews.map((el) => el.evalLocation))}
                />
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-center">
              <div>
                <label>Sadrzaj</label>
                <Star
                  rating={average(props.reviews.map((el) => el.evalThings))}
                />
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-center">
              <div>
                <label>Cistoca</label>
                <Star
                  rating={average(props.reviews.map((el) => el.evalClean))}
                />
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-center">
              <div>
                <label>Odnos cena kvalitet</label>
                <Star
                  rating={average(props.reviews.map((el) => el.evalPrice))}
                />
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-center">
              <div>
                <label>Udobnost</label>
                <Star
                  rating={average(props.reviews.map((el) => el.evalComfor))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewsCarousel id="review-carousel" reviews={props.reviews} />
    </div>
  );
}

export default RoomReviews;
