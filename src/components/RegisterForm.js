import React from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import TabedCarousel from "./TabedCarousel";

function nameInput() {
  return (
    <div>
      <label for="floatingInput">Naziv smestaja</label>
      <input type="email" class="form-control" id="floatingInput" />
    </div>
  );
}

function selectInput(props) {
  return (
    <div>
      <label for="type-select" class="form-label">
        {props.label}
      </label>
      <select
        id="type-select"
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
      >
        <option selected>{props.initText}</option>
        {props.options.map((option, id) => (
          <option value={id} key={id}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function RegisterFormFirstTab(props) {
  return (
    <div>
      <Field component={nameInput} name="name"></Field>
      <Field
        component={selectInput}
        name="type"
        options={["Apartman", "Hotel", "Kuca", "Motel"]}
        label="Tip Smestaja"
        initText="Izaberite tip smestaja"
      />
      <Field
        component={selectInput}
        name="country"
        options={["Srbija", "Srbija", "Srbija", "Srbija"]}
        label="Drzava"
        initText="Izaberite drzavu"
      />
    </div>
  );
}

function RegisterForm(props) {
  return (
    <Form
      onSubmit={(values) => {
        console.log(values);
      }}
      validate={props.validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TabedCarousel tabs={["1", "2"]} id="register-form-carousel">
            <RegisterFormFirstTab />
            <RegisterFormFirstTab />
          </TabedCarousel>

          {/* <div id="carouselExampleIndicators" class="carousel slide">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
                marginLeft: "15%",
                marginRight: "15%",
              }}
            >
              <div style={{ textAlign: "center", width: "33%" }} key="1">
                <h3>A</h3>
              </div>
              <div style={{ textAlign: "center", width: "33%" }} key="2">
                <h3>B</h3>
              </div>
              <div style={{ textAlign: "center", width: "33%" }} key="3">
                <h3>C</h3>
              </div>
            </div>
            <div class="carousel-indicators" style={{ top: "30px" }}>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
                style={{ width: "33%" }}
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
                style={{ width: "33%" }}
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                style={{ width: "33%" }}
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div style={{ marginTop: "30px" }}>
                  <Field component={nameInput} name="name"></Field>
                  <Field
                    component={selectInput}
                    name="type"
                    options={["Apartman", "Hotel", "Kuca", "Motel"]}
                    label="Tip Smestaja"
                    initText="Izaberite tip smestaja"
                  />
                  <Field
                    component={selectInput}
                    name="country"
                    options={["Srbija", "Srbija", "Srbija", "Srbija"]}
                    label="Drzava"
                    initText="Izaberite drzavu"
                  />
                </div>
              </div>
              <div class="carousel-item">2.</div>
              <div class="carousel-item">3.</div>
            </div>
            <div style={{ display: "flex" }}>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
                style={{ position: "relative", border: "2px solid black" }}
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next "
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
                style={{
                  position: "relative",
                  backgroundColor: "blue",
                  padding: "5px 100px",
                  marginLeft: "10px",
                }}
              >
                Nastavi
                {/* <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span> */}
          {/* </form></button> */}
          {/* </div> */}
          {/* </div> */}
        </form>
      )}
    />
  );
}

export default RegisterForm;
