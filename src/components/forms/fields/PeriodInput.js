import { useState, useRef, useEffect } from "react";
import { useForm } from "react-final-form";
import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

function PeriodInput(props) {
  const dateInArray = (date, array) => array.some((d) => +d === +date);
  const { change } = useForm();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  useEffect(() => {
    change("period", state[0]);
  }, [state]);

  const dateRef = useRef();

  function customDayContent(day) {
    if (props.disabledDates && dateInArray(day, props.disabledDates)) {
      return (
        <div data-toggle="tooltip" data-placement="bottom" title="Zauzeto">
          <span>{format(day, "d")}</span>
        </div>
      );
    }
    return (
      <div>
        <span>{format(day, "d")}</span>
      </div>
    );
  }
  return (
    <div>
      <label className="form-label">
        {props.label ? props.label : "Datum"}
      </label>

      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          <i className="bi bi-calendar-date-fill"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Date"
          aria-label="Date"
          readOnly
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
          months={window.innerWidth > 1050 ? 2 : 1}
          ranges={state}
          disabledDates={props.disabledDates}
          minDate={new Date()}
          maxDate={addDays(new Date(), 200)}
          dayContentRenderer={customDayContent}
          direction="horizontal"
        />
      </div>
    </div>
  );
}

export default PeriodInput;
