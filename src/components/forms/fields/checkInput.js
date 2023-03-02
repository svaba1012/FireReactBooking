function checkInput(props) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={props.id}
        {...props.input}
      />
      <label className="form-check-label" for={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export default checkInput;
