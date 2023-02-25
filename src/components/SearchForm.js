import React, { useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { searchLocations } from "../actions";
import { addDays } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useForm } from "react-final-form";
import { searchRooms } from "../actions";

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

function PeriodInput() {
  const { change } = useForm();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  change("period", state[0]);

  const dateRef = useRef();
  return (
    <div>
      <label className="form-label">Datum</label>

      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          <i class="bi bi-calendar-date-fill"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Date"
          aria-label="Date"
          value={
            (state[0].startDate + "").substring(0, 11) +
            "- " +
            (state[0].endDate + "").substring(0, 11)
          }
          aria-describedby="addon-wrapping"
          onClick={(e) => (dateRef.current.style.display = "block")}
        />
      </div>
      <div
        ref={dateRef}
        style={{ display: "none", position: "absolute", zIndex: 2 }}
        onMouseLeave={() => (dateRef.current.style.display = "none")}
      >
        <DateRange
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
        />
      </div>
    </div>
  );
}

function NumberOfPeopleInput() {
  const { change } = useForm();
  let [people, setPeople] = useState({ old: 2, young: 0 });
  let optionListRef = useRef();
  change("numberOfPeople", people);
  return (
    <div style={{ position: "relative" }}>
      <label className="form-label">Broj ljudi</label>

      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          <i class="bi bi-person-fill"></i>
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Broj ljudi"
          readOnly
          value={`Odrasli-${people.old} ; Deca-${people.young}`}
          aria-describedby="addon-wrapping"
          placeholder="Broj ljudi"
          className="form-control"
          onClick={() => (optionListRef.current.style.display = "block")}
        />
      </div>

      <ul
        className="list-group"
        style={{ position: "absolute", width: "100%" }}
        ref={optionListRef}
        onMouseLeave={() => (optionListRef.current.style.display = "none")}
      >
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="form-floating mb-3">
            <input
              type="number"
              min={0}
              class="form-control"
              id="floatingInput"
              value={people.old}
              onChange={(e) => setPeople({ ...people, old: e.target.value })}
            />
            <label for="floatingInput">Broj odraslih</label>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="form-floating mb-3">
            <input
              type="number"
              min={0}
              class="form-control"
              id="floatingInput1"
              value={people.yound}
              onChange={(e) => setPeople({ ...people, young: e.target.value })}
            />
            <label for="floatingInput1">Broj dece</label>
          </div>
        </li>
      </ul>
    </div>
  );
}

function SearchForm(props) {
  let formStyle = props.flex
    ? { display: "flex", justifyContent: "space-around" }
    : {};

  return (
    <Form
      onSubmit={(values) => {
        props.searchRooms(values.location, { start: 20, end: 25 }, null);
      }}
      validate={props.validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Pretrazi</h2>
          <div style={formStyle}>
            <Field name="location" component={LocationInput} />
            <Field name="period" component={PeriodInput} />
            <Field name="numberOfPeople" component={NumberOfPeopleInput} />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "10px", width: "100%" }}
          >
            <i class="bi bi-search"></i> Trazi
          </button>
        </form>
      )}
    />
  );
}

export default connect(null, { searchRooms })(SearchForm);
