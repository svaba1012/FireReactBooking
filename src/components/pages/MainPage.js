import React from "react";
import LocationSelect from "../forms/fields/LocationSelect";
import SearchForm from "../forms/SearchForm";

function MainPage() {
  return (
    <div style={{ marginTop: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Welcome to FireReactBooking</h1>
      <LocationSelect />
      <div>
        <SearchForm onSubmit={() => {}} validate={() => {}} flex />
      </div>
    </div>
  );
}

export default MainPage;
