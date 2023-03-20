import React from "react";
import SearchForm from "../forms/SearchForm";

function MainPage() {
  return (
    <div style={{ marginTop: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Welcome to FireReactBooking</h1>
      <div>
        <SearchForm onSubmit={() => {}} validate={() => {}} flex />
      </div>
    </div>
  );
}

export default MainPage;
