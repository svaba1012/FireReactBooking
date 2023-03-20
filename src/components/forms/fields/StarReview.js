import Star from "react-star-review";

function StarReview(props) {
  return (
    <div className="d-flex justify-content-center">
      <div>
        <label>{props.label}</label>
        <Star
          interactive
          rating={props.input.value}
          onRatingChanged={props.input.onChange}
        />
      </div>
    </div>
  );
}

export default StarReview;
