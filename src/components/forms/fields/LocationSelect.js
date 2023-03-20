import React, { useEffect } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import geoapify from "../../../api/geoapify";

function formatOptionLabel(data) {
  return (
    <div className="row">
      <div className="col-1 d-flex justify-content-center align-items-center">
        <i class="fa-sharp fa-solid fa-city fa-fade"></i>
      </div>
      <div className="col-11">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{data.city ? data.city : data.name}</div>
          {data.state}, {data.country}
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
    />
  );
}

export default LocationSelect;
