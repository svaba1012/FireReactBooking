import React, { useMemo, useState } from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import MapSetLocation from "./MapSetLocation";
import TabedCarousel from "./TabedCarousel";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { insertRoom } from "../actions";
import { useForm } from "react-final-form";
import { useFormState } from "react-final-form";

function classicInput(props) {
  let inputJsx;
  let cssClass = "form-control ";
  if (props.meta.touched && props.meta.error) {
    cssClass += "is-invalid";
  }
  if (props.inputType === "number") {
    inputJsx = (
      <div>
        <input
          type={props.inputType}
          className={cssClass}
          id={props.id}
          min={props.min}
          {...props.input}
        />
        <div className="invalid-feedback">{props.meta.error}</div>
      </div>
    );
  } else {
    inputJsx = (
      <div>
        <input
          type={props.inputType}
          className={cssClass}
          id={props.id}
          {...props.input}
        />
        <div className="invalid-feedback">{props.meta.error}</div>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label for={props.id}>{props.label}</label>
      {inputJsx}
    </div>
  );
}

function selectInput(props) {
  return (
    <div key={props.key}>
      <label for={props.name} className="form-label">
        {props.label}
      </label>
      <select
        id={props.name}
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        {...props.input}
      >
        {/* <option selected>{props.initText}</option> */}
        {props.options.map((option, id) => (
          <option value={id} key={id}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function checkInput(props) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={props.id}
        {...props.input}
      />
      <label className="form-check-label" for={props.id}>
        {props.label}
      </label>
    </div>
  );
}

function mapInput(props) {
  return (
    <div>
      <MapSetLocation id={props.id} />
    </div>
  );
}

function PictureInput(props) {
  let [selectedFiles, setSelectedFiles] = useState([]);
  let { change } = useForm();
  // change("pics, selectedFiles");
  const dropZone = useDropzone({
    accept: { "image/png": [".png"] },
    onDropAccepted: async (acceptedFiles) => {
      change("pics", [...selectedFiles, ...acceptedFiles]);
      await setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
  });
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isFocused,
    isDragReject,
  } = dropZone;

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20vh",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    // backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = selectedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Prevuci ili klikni za ubacivanje slika</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {selectedFiles.map((file, id) => {
            let imgUrl = URL.createObjectURL(file);
            return (
              <div
                style={{
                  width: "40vh",
                  position: "relative",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={imgUrl}
                  style={{
                    width: "40vh",
                    height: "40vh",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "5px",
                    objectFit: "cover",
                  }}
                  key={id}
                  alt="Slika"
                ></img>
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "5px",
                    zIndex: 3,
                  }}
                  onClick={(e) => {
                    URL.revokeObjectURL(file.preview);
                    setSelectedFiles(selectedFiles.filter((el, i) => i !== id));
                  }}
                >
                  <i
                    class="bi bi-x-circle-fill"
                    style={{
                      color: "red",
                      fontSize: "xx-large",
                      cursor: "pointer",
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </section>
  );
}

function RegisterFormFirstTabFirst(props) {
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
        name="country"
        options={["Srbija", "Srbija", "Srbija", "Srbija"]}
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
              <RegisterFormFirstTabFirst />
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

export default connect(null, { insertRoom })(RegisterForm);
