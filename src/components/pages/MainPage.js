import React from "react";
import SearchForm from "../forms/SearchForm";

function MainPage() {
  return (
    <div style={{ marginTop: "30px" }}>
      <h1 style={{ textAlign: "center" }}>
        Dobrosdosli na <span className="text-warning">Fire</span>
        <span className="text-primary">React</span>
        <span className="text-warning">Booking</span>
      </h1>
      <div>
        <SearchForm onSubmit={() => {}} validate={() => {}} flex />
      </div>
    </div>
  );
}

export default MainPage;
