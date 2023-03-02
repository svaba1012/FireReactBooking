import { useState, useRef } from "react";
import { useForm } from "react-final-form";
import { addDays, format } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
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
  change("period", state[0]);

  const dateRef = useRef();

  function customDayContent(day) {
    let text = "Rezervisi";
    if (props.disabledDates && dateInArray(day, props.disabledDates)) {
      text = "Zauzeto";
    }
    return (
      <div data-toggle="tooltip" data-placement="bottom" title={text}>
        <span>{format(day, "d")}</span>
      </div>
    );
  }
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
          disabledDates={props.disabledDates}
          minDate={props.minDate}
          dayContentRenderer={customDayContent}
          direction="horizontal"
        />
      </div>
    </div>
  );
}

export default PeriodInput;
