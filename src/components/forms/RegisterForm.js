import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import TabedCarousel from "../TabedCarousel";
import { connect } from "react-redux";
import { insertRoom, getLocations } from "../../actions";
import classicInput from "./fields/classicInput";
import checkInput from "./fields/checkInput";
import selectInput from "./fields/selectInput";
import mapInput from "./fields/mapInput";
import PictureInput from "./fields/PictureInput";

function RegisterFormFirstTabFirst(props) {
  if (!props.locations) {
    return;
  }
  return (
    <div>
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
        label="Tip Smestaja"
        initText="Izaberite tip smestaja"
      />
      <Field
        component={selectInput}
        name="locationId"
        options={props.locations.map((el) => el.name)}
        selectValues={props.locations.map((el) => el.id)}
        label="Drzava"
        initText="Izaberite drzavu"
      />
    </div>
  );
}

function RegisterFormFirstTabSecond(props) {
  return (
    <div>
      {/* <Field component={mapInput} name="cords" id={props.mapId} />; */}
    </div>
  );
}

function RegisterFormSecondTabFirst(props) {
  let data = [
    { name: "numOfPeople", label: "Broj gostiju", min: 1 },
    { name: "numOfBracni", label: "Bracni", min: 0 },
    { name: "numOfObican", label: "Obican", min: 0 },
    { name: "numOfKauc", label: "Kauc", min: 0 },
    { name: "numOfBathrooms", label: "Broj kupatila", min: 0 },
    { name: "area", label: "Povrsina (m2)", min: 0 },
  ];

  return (
    <div style={{ width: "30vw" }}>
      {data.map((el, id) => {
        let header = "";
        let footer = "";
        if (id === 1) {
          header = <h5>Broj kreveta</h5>;
        }
        if (id !== 1 && id !== 2) {
          footer = <hr />;
        }
        return (
          <div key={id}>
            {header}
            <Field
              component={classicInput}
              name={el.name}
              label={el.label}
              inputType="number"
              id={el.name}
              min={el.min}
            />
            {footer}
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

  return arrayChecks.map((el, superId) => {
    let data = [
      ["klima", "grejanje", "wifi", "parking"],
      ["kuhinja", "cajnaKuhinja", "vesMasina"],
      ["tv", "sauna", "miniBar", "djakuzi"],
      ["terasa", "dvoriste"],
      ["engleski", "nemacki", "srpski"],
      ["pusenje", "ljubimci", "dogadjaji"],
    ];

    return (
      <div key={superId}>
        <h5>{el.label}</h5>
        {el.checks.map((check, id) => (
          <div key={`${superId}-${id}`}>
            <Field
              name={data[superId][id]}
              id={`check${superId}-${id}`}
              component={checkInput}
              label={check}
            />
          </div>
        ))}
        <hr />
      </div>
    );
  });
}

function RegisterFormSecondTabThird(props) {
  let options = [...Array(24).keys()].map((el) => `${el}:00`);

  return (
    <div>
      <h5>Prijavljivanje</h5>
      <div style={{ display: "flex" }} key={1}>
        <Field
          component={selectInput}
          name="prijavaOd"
          options={options}
          label="Od"
          initText="Izaberite vreme"
          key={1}
        />
        <Field
          component={selectInput}
          name="prijavaDo"
          options={options}
          label="Do"
          initText="Izaberite vreme"
          key={2}
        />
      </div>
      <h5>Odjavljivanje</h5>
      <div style={{ display: "flex" }} key={2}>
        <Field
          component={selectInput}
          name="odjavaOd"
          options={options}
          label="Od"
          initText="Izaberite vreme"
          key={1}
        />
        <Field
          component={selectInput}
          name="odjavaDo"
          options={options}
          label="Od"
          initText="Izaberite vreme"
          key={2}
        />
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

function RegisterFormForthTab(props) {
  return (
    <div>
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
  useEffect(() => {
    async function fetchData() {
      await props.getLocations();
    }
    fetchData();
  }, []);

  console.log("lokacije" + props.locations);
  const getValidateText = (validNum) => {
    if (validNum === 0) {
      return;
    }
    if (validNum === 1) {
      return <i class="bi bi-check-circle-fill" style={{ color: "green" }}></i>;
    } else {
      return <i class="bi bi-x-circle-fill" style={{ color: "red" }}></i>;
    }
  };

  let [tabs, setTabs] = useState([
    { name: "Naziv i lokacija", count: 2, validTab: [0, 0] },
    { name: "Pregled objekta", count: 3, validTab: [0, 1, 0] },
    { name: "Slike", count: 1, validTab: [0] },
    { name: "Cena", count: 1, validTab: [0] },
  ]);

  const setValidTab = (tabStates) => {
    setTabs(
      tabs.map((tab, id) => {
        return { ...tab, validTab: tabStates[id] };
      })
    );
  };

  const validateInputs = (submiting, values) => {
    let errors = {};
    let tabStates = [[1, 1], [1, 1, 1], [1], [1]];
    if (!values.name || values.name.length < 10) {
      errors.name = "*Naziv smestaja mora biti duzine bar 10 slova";
      if (submiting) {
        tabStates[0][0] = -1;
      }
    }
    if (values.pics) {
      if (values.pics.length < 3) {
        errors.pics = "*Minimalan broj slika je 3";
        // setValidTab(-1, 2, 0);
      }
      if (values.pics.length > 10) {
        errors.pics = "*Maksimalan broj slika je 10";
        // setValidTab(-1, 2, 0);
      }
    } else {
      errors.pics = "*Minimalan broj slika je 3";
      // setValidTab(-1, 2, 0);
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
      if (submiting) tabStates[3][0] = -1;
    }
    if (submiting) {
      setValidTab(tabStates);
    }
    return errors;
  };

  return (
    <Form
      onSubmit={(values) => {
        console.log(values);
        props.insertRoom(values);
      }}
      validate={(values) => validateInputs(false, values)}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit} noValidate>
            <TabedCarousel
              tabs={tabs}
              id="register-form-carousel"
              getTabText={getValidateText}
            >
              <RegisterFormFirstTabFirst locations={props.locations} />
              <RegisterFormFirstTabSecond mapId="map" />

              <RegisterFormSecondTabFirst />
              <RegisterFormSecondTabSecond />
              <RegisterFormSecondTabThird />
              <RegisterFormThirdTab />
              <RegisterFormForthTab />
            </TabedCarousel>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => validateInputs(true, values)}
              >
                Registruj
              </button>
            </div>
          </form>
        );
      }}
    />
  );
}

const mapState = (state) => {
  return { locations: state.locations };
};

export default connect(mapState, { insertRoom, getLocations })(RegisterForm);
