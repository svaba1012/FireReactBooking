import { useRef, useState } from "react";
import { useForm } from "react-final-form";
import { connect } from "react-redux";
import { searchLocations } from "../../../actions";

function LocationInputField(props) {
  const { change } = useForm();
  const input = useRef();
  const optionList = useRef();
  let timer = null;
  const onInputChange = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (e.target.value === "") {
      optionList.current.style.display = "none";
      return;
    }
    timer = setTimeout(() => {
      props.searchLocations(e.target.value);
      optionList.current.style.display = "block";
    }, 600);
  };

  return (
    <div style={{ position: "relative" }}>
      <label className="form-label">Lokacija</label>

      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          <i class="bi bi-geo-alt-fill"></i>
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Lokacija"
          aria-describedby="addon-wrapping"
          ref={input}
          value={props.input.value}
          placeholder="Lokacija..."
          className="form-control"
          onChangeCapture={onInputChange}
          onChange={props.input.onChange}
          // onChange={(e) => {
          //   // onInputChange(e);
          //   return props.input.onChange();
          // }}
        />
      </div>

      <ul
        className="list-group"
        ref={optionList}
        style={{ position: "absolute", width: "100%", zIndex: 3 }}
        onMouseLeave={() => (optionList.current.style.display = "none")}
      >
        {props.locations.map((location, id) => {
          return (
            <li
              key={id}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => {
                optionList.current.style.display = "none";
                change("location", location.name);
              }}
            >
              {location.name}
              <span className="badge bg-primary rounded-pill">14</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const locationInputMapStateToProps = (state) => {
  return { locations: state.searchedLocations };
};

const LocationInput = connect(locationInputMapStateToProps, {
  searchLocations,
})(LocationInputField);

export default LocationInput;
