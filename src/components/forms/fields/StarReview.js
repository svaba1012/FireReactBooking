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
          borderColor={
            props.meta.touched && props.meta.error ? "#d9534f" : "#E4B50E"
          }
          clearColor={
            props.meta.touched && props.meta.error ? "#f9736f" : "#FFF"
          }
        />
        {props.meta.touched && props.meta.error ? (
          <small className="text-danger">{props.meta.error}</small>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default StarReview;
