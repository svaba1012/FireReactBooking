import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { searchRooms } from "../../actions";
import LocationInput from "./fields/LocationInput";
import PeriodInput from "./fields/PeriodInput";
import NumberOfPeopleInput from "./fields/NumberOfPeopleInput";

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
