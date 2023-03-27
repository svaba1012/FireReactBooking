import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { searchRooms } from "../../actions";
import PeriodInput from "./fields/PeriodInput";
import NumberOfPeopleInput from "./fields/NumberOfPeopleInput";
import LocationSelect from "./fields/LocationSelect";

function SearchForm(props) {
  // let formStyle = props.flex
  //   ? { display: "flex", justifyContent: "space-around", padding: "10px" }
  //   : {};

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
        if (props.isSearchPage) {
          navigate(0);
        }
      }}
      validate={props.validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Pretrazi</h2>
          <div className="row">
            <div
              className={props.flex ? "col-12 col-md-4" : "col-12"}
              style={{ marginBottom: "10px" }}
            >
              <Field
                name="location"
                component={LocationSelect}
                // width={props.flex ? "30%" : "100%"}
              />
            </div>
            <div
              className={props.flex ? "col-12 col-md-4" : "col-12"}
              style={{ marginBottom: "10px" }}
            >
              {/* <Field name="location" component={LocationInput} /> */}
              <Field name="period" component={PeriodInput} />
            </div>
            <div
              className={props.flex ? "col-12 col-md-4" : "col-12"}
              style={{ marginBottom: "10px" }}
            >
              <Field name="numberOfPeople" component={NumberOfPeopleInput} />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary col-12 col-md-4"
              style={{ marginTop: "10px" }}
            >
              <i className="bi bi-search"></i> Trazi
            </button>
          </div>
        </form>
      )}
    />
  );
}

export default connect(null, { searchRooms })(SearchForm);
