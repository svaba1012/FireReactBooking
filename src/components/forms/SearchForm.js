import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { searchRooms } from "../../actions";
import PeriodInput from "./fields/PeriodInput";
import NumberOfPeopleInput from "./fields/NumberOfPeopleInput";
import LocationSelect from "./fields/LocationSelect";

function SearchForm(props) {
  let formStyle = props.flex
    ? { display: "flex", justifyContent: "space-around", padding: "10px" }
    : {};

  let navigate = useNavigate();

  return (
    <Form
      onSubmit={(values) => {
        navigate(
          `/search?lat=${values.location.lat}&lon=${
            values.location.lon
          }&startDate=${values.period.startDate.getTime() / 1000}&endDate=${
            values.period.endDate.getTime() / 1000
          }&filter=${values.numberOfPeople}`
        );
      }}
      validate={props.validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* <h2>Pretrazi</h2> */}
          <div style={formStyle}>
            <Field
              name="location"
              component={LocationSelect}
              width={props.flex ? "30%" : "100%"}
            />

            {/* <Field name="location" component={LocationInput} /> */}
            <Field name="period" component={PeriodInput} />
            <Field name="numberOfPeople" component={NumberOfPeopleInput} />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "10px", width: "100%" }}
          >
            <i className="bi bi-search"></i> Trazi
          </button>
        </form>
      )}
    />
  );
}

export default connect(null, { searchRooms })(SearchForm);
