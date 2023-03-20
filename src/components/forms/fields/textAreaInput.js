function textAreaInput(props) {
  let inputJsx;
  let cssClass = "form-control ";
  if (props.meta.touched && props.meta.error) {
    cssClass += "is-invalid";
  }

  inputJsx = (
    <div>
      <textarea
        className={cssClass}
        id={props.id}
        {...props.input}
        style={{
          width: "100%",
          minHeight: `${props.height ? props.height : 50}vh`,
          resize: "none",
        }}
      />
      <div className="invalid-feedback">{props.meta.error}</div>
    </div>
  );

  return (
    <div className="mb-3">
      <label htmlFor={props.id}>{props.label}</label>
      {inputJsx}
    </div>
  );
}

export default textAreaInput;
