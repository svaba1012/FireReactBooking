function selectInput(props) {
  return (
    <div key={props.key}>
      <label htmlFor={props.name} className="form-label">
        {props.label}
      </label>
      <select
        id={props.name}
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        {...props.input}
      >
        {/* <option selected>{props.initText}</option> */}
        {props.options.map((option, id) => {
          let value = id;

          if (props.selectValues) {
            value = props.selectValues[id];
          }

          return (
            <option value={value} key={id}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default selectInput;
