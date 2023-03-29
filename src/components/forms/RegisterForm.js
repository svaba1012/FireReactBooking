import React, { useState } from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import TabedCarousel from "../TabedCarousel";
import { connect } from "react-redux";
import { insertRoom, setStage, getPlaceCords } from "../../actions";
import classicInput from "./fields/classicInput";
import checkInput from "./fields/checkInput";
import selectInput from "./fields/selectInput";
import PictureInput from "./fields/PictureInput";
import textAreaInput from "./fields/textAreaInput";
import MapLocationMarker from "../MapLocationMarker";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

function RegisterFormFirstTabFirst(props) {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <Field
        component={classicInput}
        name="name"
        id="name"
        inputType="text"
        label="Naziv smestaja"
      ></Field>
      <Field
        component={selectInput}
        name="type"
        options={["Apartman", "Hotel", "Kuca", "Motel"]}
        selectValues={["Apartman", "Hotel", "Kuca", "Motel"]}
        label="Tip Smestaja"
        initText="Izaberite tip smestaja"
      />
      <Field
        component={classicInput}
        name="address"
        id="addres"
        inputType="text"
        label="Adresa smestaja"
      ></Field>
    </div>
  );
}

function RegisterFormFirstTabSecond(props) {
  if (!props.mapCenter) {
    return <div></div>;
  }

  return (
    <div>
      <Field
        component={MapLocationMarker}
        name="cords"
        center={[props.mapCenter.lat, props.mapCenter.lon]}
      />
    </div>
  );
}

function RegisterFormSecondTabFirst(props) {
  let data = [
    { name: "numOfPeople", label: "Broj gostiju", min: 1 },
    {
      label: "Broj kreveta",
      arr: [
        { name: "numOfBracni", label: "Bracni", min: 0 },
        { name: "numOfObican", label: "Obican", min: 0 },
        { name: "numOfKauc", label: "Kauc", min: 0 },
      ],
    },
    { name: "numOfBathrooms", label: "Broj kupatila", min: 0 },
    { name: "area", label: "Povrsina (m2)", min: 0 },
  ];

  return (
    <div className="row">
      {data.map((el, id) => {
        if (id === 1) {
          return (
            <div key={id}>
              <h5>{el.label}</h5>
              <div className="row">
                {el.arr.map((element, id1) => (
                  <div key={id1} className="col-12 col-md-4">
                    <Field
                      component={classicInput}
                      name={element.name}
                      label={element.label}
                      inputType="number"
                      id={element.name}
                      min={element.min}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={id}>
            {id === 2 ? <hr /> : ""}
            <div className={id === 0 ? "col-6 col-md-4" : "col-6"}>
              <Field
                component={classicInput}
                name={el.name}
                label={el.label}
                inputType="number"
                id={el.name}
                min={el.min}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RegisterFormSecondTabSecond(props) {
  let arrayChecks = [
    { checks: ["Klima", "Grejanje", "Wi-fi", "Parking"], label: "Opste" },
    {
      checks: ["Kuhinja", "Cajna kuhinja", "Ves masina"],
      label: "Kuvanje i cistoca",
    },
    { checks: ["TV", "Sauna", "Mini-bar", "Djakuzi"], label: "Zabava" },
    {
      checks: ["Terasa", "Dvoriste"],
      label: "Spoljasnjost",
    },
    {
      checks: ["Engleski", "Nemacki", "Srpski"],
      label: "Jezici koje koristi osoblje",
    },
    {
      checks: [
        "Dozvoljeno pusenje",
        "Dozvoljen boravak kucnih ljubimaca",
        "Dozvoljene zurke/dogadjaji",
      ],
      label: "Ostalo",
    },
  ];

  return (
    <div className="row">
      {" "}
      {arrayChecks.map((el, superId) => {
        let data = [
          ["klima", "grejanje", "wifi", "parking"],
          ["kuhinja", "cajnaKuhinja", "vesMasina"],
          ["tv", "sauna", "miniBar", "djakuzi"],
          ["terasa", "dvoriste"],
          ["engleski", "nemacki", "srpski"],
          ["pusenje", "ljubimci", "dogadjaji"],
        ];

        return (
          <div
            key={superId}
            style={{ padding: "20px", borderBottom: "solid 2px grey" }}
            className="col-12 col-md-6 col-lg-4"
          >
            <h5>{el.label}</h5>
            {el.checks.map((check, id) => (
              <div key={`${superId}-${id}`}>
                <Field
                  type="checkbox"
                  name={data[superId][id]}
                  id={`check${superId}-${id}`}
                  component={checkInput}
                  label={check}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function RegisterFormSecondTabThird(props) {
  let options = [...Array(24).keys()].map((el) => `${el}:00`);

  return (
    <div>
      <h5>Prijavljivanje</h5>
      <div className="d-flex" key={1}>
        <div style={{ marginRight: "20px" }}>
          <Field
            component={selectInput}
            name="prijavaOd"
            options={options}
            label="Od"
            initText="Izaberite vreme"
            key={1}
          />
        </div>
        <div>
          <Field
            component={selectInput}
            name="prijavaDo"
            options={options}
            label="Do"
            initText="Izaberite vreme"
            key={2}
          />
        </div>
      </div>
      <h5>Odjavljivanje</h5>
      <div className="d-flex" key={2}>
        <div style={{ marginRight: "20px" }}>
          <Field
            component={selectInput}
            name="odjavaOd"
            options={options}
            label="Od"
            initText="Izaberite vreme"
            key={1}
          />
        </div>
        <div>
          <Field
            component={selectInput}
            name="odjavaDo"
            options={options}
            label="Do"
            initText="Izaberite vreme"
            key={2}
          />
        </div>
      </div>
    </div>
  );
}

function RegisterFormThirdTab(props) {
  return (
    <div>
      <Field name="pictures" component={PictureInput}></Field>
    </div>
  );
}

function RegisterFormForthTabFirst(props) {
  return (
    <div>
      <Field
        name="description"
        component={textAreaInput}
        id="description"
        label="Opis smestaja"
      ></Field>
    </div>
  );
}

function RegisterFormForthTabSecond(props) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <Field
        name="pricePerNight"
        component={classicInput}
        id="price"
        type="number"
        min={0}
        label="Cena nocenja po osobi"
      ></Field>
    </div>
  );
}

function RegisterForm(props) {
  let navigate = useNavigate();

  let [tabs, setTabs] = useState([
    { name: "Naziv i lokacija", count: 2, validTab: [0, 0] },
    { name: "Pregled objekta", count: 3, validTab: [0, 0, 0] },
    { name: "Slike", count: 1, validTab: [0] },
    { name: "Opis i cena", count: 2, validTab: [0, 0] },
  ]);

  const getValidateText = (validNum) => {
    if (validNum === 0) {
      return;
    }
    if (validNum === 1) {
      return (
        <i className="bi bi-check-circle-fill" style={{ color: "green" }}></i>
      );
    } else {
      return <i className="bi bi-x-circle-fill" style={{ color: "red" }}></i>;
    }
  };
  const setValidTab = (tabStates) => {
    setTabs(
      tabs.map((tab, id) => {
        return { ...tab, validTab: tabStates[id] };
      })
    );
  };

  const validateInputs = (submiting, values) => {
    let errors = {};
    let tabStates = [[1, 1], [1, 1, 1], [1], [1, 1]];
    if (!values.name || values.name.length < 10) {
      errors.name = "*Naziv smestaja mora biti duzine bar 10 slova";
      if (submiting) {
        tabStates[0][0] = -1;
      }
    }
    if (!values.address || values.address.length < 10) {
      errors.address = "*Adresa smestaja mora biti duzine bar 10 slova";
      if (submiting) {
        tabStates[0][0] = -1;
      }
    }
    if (values.pics) {
      if (values.pics.length < 3) {
        errors.pics = "*Minimalan broj slika je 3";
        if (submiting) tabStates[2][0] = -1;
      }
      if (values.pics.length > 10) {
        errors.pics = "*Maksimalan broj slika je 10";
        if (submiting) tabStates[2][0] = -1;
      }
    } else {
      errors.pics = "*Minimalan broj slika je 3";
      if (submiting) tabStates[2][0] = -1;
    }

    if (!values.numOfPeople || values.numOfPeople < 1) {
      errors.numOfPeople = "*Unesite broj gostiju koji je veci od 0";
      if (submiting) tabStates[1][0] = -1;
    }
    if (!values.numOfBracni || values.numOfBracni < 0) {
      errors.numOfBracni =
        "*Unesite broj bracnih kreveta koji nije negativan broj";
      if (submiting) tabStates[1][0] = -1;
    }
    if (!values.numOfObican || values.numOfObican < 0) {
      errors.numOfObican =
        "*Unesite broj obicnih kreveta koji nije negativan broj";
      if (submiting) tabStates[1][0] = -1;
    }
    if (!values.numOfKauc || values.numOfKauc < 0) {
      errors.numOfKauc = "*Unesite broj kauca koji nije negativan broj";
      if (submiting) tabStates[1][0] = -1;
    }
    if (!values.numOfBathrooms || values.numOfBathrooms < 0) {
      errors.numOfBathrooms = "*Unesite broj kupatila koji nije negativan broj";
      if (submiting) tabStates[1][0] = -1;
    }
    if (!values.area || values.area < 0) {
      errors.area = "*Unesite povrsinu koja nije negativan broj";
      if (submiting) tabStates[1][0] = -1;
    }

    if (!values.pricePerNight || values.pricePerNight < 0) {
      errors.pricePerNight = "*Unesite cenu koja nije negativan broj";
      if (submiting) tabStates[3][1] = -1;
    }
    if (!values.description || values.description.length < 100) {
      errors.description = "*Opis smestaja mora biti duzine bar 100 slova";
      if (submiting) {
        tabStates[3][0] = -1;
      }
    }
    if (submiting) {
      setValidTab(tabStates);
    }
    return errors;
  };

  return (
    <Form
      onSubmit={(values) => {
        values.cords = [values.cords.lat, values.cords.lng];
        props.insertRoom(values, navigate, auth.currentUser);
      }}
      initialValues={{
        type: "Apartman",
        prijavaOd: 15,
        prijavaDo: 16,
        odjavaOd: 11,
        odjavaDo: 12,
      }}
      validate={(values) => validateInputs(false, values)}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit} noValidate>
            <TabedCarousel
              tabs={tabs}
              id="register-form-carousel"
              getTabText={getValidateText}
              onTabChanged={(prevId, id) => {
                if (prevId === 0 && id === 1) {
                  props.getPlaceCords(values.address);
                }
              }}
              onNextSlideBtnClick={() => {
                let errors = validateInputs(true, values);

                if (Object.keys(errors).length === 0) {
                  //if error is empty array
                  handleSubmit(values);
                }
              }}
            >
              <RegisterFormFirstTabFirst locations={props.locations} />
              <RegisterFormFirstTabSecond
                mapId="map"
                mapCenter={props.mapCenter}
              />

              <RegisterFormSecondTabFirst />
              <RegisterFormSecondTabSecond />
              <RegisterFormSecondTabThird />
              <RegisterFormThirdTab />
              <RegisterFormForthTabFirst />
              <RegisterFormForthTabSecond />
            </TabedCarousel>
            {/* <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  validateInputs(true, values);
                  // props.setStage(true);
                }}
              >
                Registruj
              </button>
            </div> */}
          </form>
        );
      }}
    />
  );
}

const mapState = (state) => {
  return { mapCenter: state.mapCenter };
};

export default connect(mapState, {
  insertRoom,
  setStage,
  getPlaceCords,
})(RegisterForm);
