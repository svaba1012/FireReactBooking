function classicInput(props) {
  let inputJsx;
  let cssClass = "form-control ";
  if (props.meta.touched && props.meta.error) {
    cssClass += "is-invalid";
  }
  if (props.inputType === "number") {
    inputJsx = (
      <div>
        <input
          type={props.inputType}
          className={cssClass}
          id={props.id}
          min={props.min}
          {...props.input}
        />
        <div className="invalid-feedback">{props.meta.error}</div>
      </div>
    );
  } else {
    inputJsx = (
      <div>
        <input
          type={props.inputType}
          className={cssClass}
          id={props.id}
          {...props.input}
        />
        <div className="invalid-feedback">{props.meta.error}</div>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label for={props.id}>{props.label}</label>
      {inputJsx}
    </div>
  );
}

export default classicInput;
