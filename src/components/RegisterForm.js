import React, { useMemo, useState } from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import MapSetLocation from "./MapSetLocation";
import TabedCarousel from "./TabedCarousel";
import { useDropzone } from "react-dropzone";

function classicInput(props) {
  let inputJsx;
  if (props.inputType === "number") {
    inputJsx = (
      <input
        type={props.inputType}
        className="form-control"
        id={props.id}
        min={props.min}
      />
    );
  } else {
    inputJsx = (
      <input type={props.inputType} className="form-control" id={props.id} />
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
      <label for={props.name} class="form-label">
        {props.label}
      </label>
      <select
        id={props.name}
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        defaultValue={0}
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
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id={props.id} />
      <label class="form-check-label" for={props.id}>
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
  const dropZone = useDropzone({
    accept: { "image/png": [".png"] },
    onDropAccepted: (acceptedFiles) =>
      setSelectedFiles([...selectedFiles, ...acceptedFiles]),
  });
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isFocused,
    isDragReject,
  } = dropZone;
  console.log(dropZone);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
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

  console.log(selectedFiles);

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
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
      <Field component={mapInput} name="cords" id={props.mapId} />;
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
    return (
      <div key={superId}>
        <h5>{el.label}</h5>
        {el.checks.map((check, id) => (
          <div key={`${superId}-${id}`}>
            <Field
              name={`check${superId}-${id}`}
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
  return <div>4. Tab</div>;
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
          <TabedCarousel
            tabs={[
              { name: "Naziv i lokacija", count: 2 },
              { name: "Pregled objekta", count: 3 },
              { name: "Slike", count: 1 },
              { name: "Cena", count: 1 },
            ]}
            id="register-form-carousel"
          >
            <RegisterFormFirstTabFirst />
            <RegisterFormFirstTabSecond mapId="map" />

            <RegisterFormSecondTabFirst />
            <RegisterFormSecondTabSecond />
            <RegisterFormSecondTabThird />
            <RegisterFormThirdTab />
            <RegisterFormForthTab />
          </TabedCarousel>
        </form>
      )}
    />
  );
}

export default RegisterForm;
