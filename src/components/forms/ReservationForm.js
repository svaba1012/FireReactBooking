import React from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import PeriodInput from "./fields/PeriodInput";
import { connect } from "react-redux";
import { reserveRoom } from "../../actions";
import { subDays, eachDayOfInterval } from "date-fns";
import { auth } from "../../config/firebase";

function ReservationForm(props) {
  let disabledDates = [];
  props.room.reservations.forEach((el) => {
    disabledDates = [
      ...disabledDates,
      ...eachDayOfInterval({
        start: new Date(el.startDate * 1000),
        end: new Date(el.endDate * 1000),
      }),
    ];
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log(values);
        props.reserveRoom(props.room, values.period, auth.currentUser);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="date"
            component={PeriodInput}
            disabledDates={disabledDates}
            label="Izaberite slobodne datume da rezervisete smestaj"
          ></Field>
          <button className="btn btn-primary" style={{ marginTop: "20px" }}>
            <i className="bi bi-calendar-check-fill"></i> Rezervisi
          </button>
        </form>
      )}
    ></Form>
  );
}

export default connect(null, { reserveRoom })(ReservationForm);
