import React, { useEffect } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import geoapify from "../../../api/geoapify";

let icons = {
  unknown: {
    icon: <i class="fa-sharp fa-solid fa-city fa-fade"></i>,
    text: "Nepoznato",
  },
  amenity: {
    icon: <i class="fa-solid fa-building-wheat fa-fade"></i>,
    text: "Lokacija",
  },
  building: {
    icon: <i class="fa-sharp fa-solid fa-city fa-fade"></i>,
    text: "Zgrada",
  },
  street: { icon: <i class="fa-solid fa-road fa-fade"></i>, text: "Ulica" },
  suburb: {
    icon: <i class="fa-solid fa-house-chimney fa-fade"></i>,
    text: "Predgradje",
  },
  district: {
    icon: <i class="fa-solid fa-building fa-fade"></i>,
    text: "Distrikt",
  },
  postcode: {
    icon: <i class="fa-solid fa-house-chimney fa-fade"></i>,
    text: "Lokacija",
  },
  city: {
    icon: <i class="fa-sharp fa-solid fa-city fa-fade"></i>,
    text: "Grad",
  },
  county: { icon: <i class="fa-solid fa-flag fa-fade"></i>, text: "Oblast" },
  state: { icon: <i class="fa-solid fa-flag fa-fade"></i>, text: "Regija" },
  country: {
    icon: <i class="fa-solid fa-flag fa-fade"></i>,
    text: "Centar",
  },
};

function formatOptionLabel(data) {
  return (
    <div className="row">
      <div
        className="col-1 d-flex justify-content-center align-items-center"
        title={`Tip: ${
          icons[data.result_type ? data.result_type : "unknown"].text
        }`}
      >
        {icons[data.result_type ? data.result_type : "unknown"].icon}
      </div>
      <div className="col-11">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{data.address_line1}</div>
          {data.city ? data.city : data.state}, {data.country}
        </div>
      </div>
    </div>
  );
}

function LocationSelect(props) {
  let loadOptions = async (inputString) => {
    if (inputString.length > 3) {
      let res = await geoapify.get("/geocode/autocomplete", {
        params: { text: inputString },
      });
      console.log(res.data.features.map((el) => el.properties));
      return res.data.features.map((el) => el.properties);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      formatOptionLabel={formatOptionLabel}
      placeholder="Lokacija..."
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          color: "white",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          cursor: "pointer",
        }),
      }}
      classNames={{
        option: (state) => "bg-dark",
        control: (state) => " bg-dark  ",
        menu: (state) => "bg-dark ",
      }}
    />
  );
}

export default LocationSelect;
