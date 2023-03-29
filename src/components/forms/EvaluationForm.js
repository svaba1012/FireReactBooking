import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import StarReview from "./fields/StarReview";
import textAreaInput from "./fields/textAreaInput";
import { insertReview } from "../../actions";
import { auth, getUserData } from "../../config/firebase";
import { getAuth } from "firebase/auth";

function EvaluationForm(props) {
  return (
    <Form
      onSubmit={(values) => {
        console.log({ ...values });
        props.insertReview(values, auth.currentUser.uid);
      }}
      validate={(values) => {
        let errors = {};
        if (!values.evalStuff) {
          errors.evalStuff = "*Oceni";
        }
        if (!values.evalThings) {
          errors.evalThings = "*Oceni";
        }
        if (!values.evalClean) {
          errors.evalClean = "*Oceni";
        }
        if (!values.evalLocation) {
          errors.evalLocation = "*Oceni";
        }
        if (!values.evalComfor) {
          errors.evalComfor = "*Oceni";
        }
        if (!values.evalPrice) {
          errors.evalPrice = "*Oceni";
        }
        return errors;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center" }}>Ocenite</h3>
          <div className="row">
            <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
              <Field component={StarReview} name="evalStuff" label="Osoblje" />
            </div>
            <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
              <Field
                component={StarReview}
                name="evalLocation"
                label="Lokacija"
              />
            </div>
            <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
              <Field component={StarReview} name="evalThings" label="Sadrzaj" />
            </div>
            <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
              <Field component={StarReview} name="evalClean" label="Cistoca" />
            </div>
            <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
              <Field
                component={StarReview}
                name="evalPrice"
                label="Odnos cena kvalitet"
              />
            </div>
            <div className="col-6 col-sm-4" style={{ marginTop: "20px" }}>
              <Field
                component={StarReview}
                name="evalComfor"
                label="Udobnost"
              />
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Field
              component={textAreaInput}
              name="evalDesc"
              id="evalDesc"
              height={15}
              label="Vase misljenje o smestaju"
            />
          </div>
          <button className="btn btn-primary" style={{ marginTop: "10px" }}>
            Oceni
          </button>
        </form>
      )}
    ></Form>
  );
}

export default connect(null, { insertReview })(EvaluationForm);
