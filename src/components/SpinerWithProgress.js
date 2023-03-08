import React from "react";

function SpinerWithProgress({ min, max, progress, text = "Loading" }) {
  return (
    <div>
      <div
        class="d-flex justify-content-center text-primary"
        style={{ marginBottom: "50px" }}
      >
        {[...Array(3).keys()].map((el) => (
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
            key={el}
          >
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ))}

        <div style={{ fontSize: "xxx-large" }}>{text}</div>
        {[...Array(3).keys()].map((el) => (
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
            key={el}
          >
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ))}
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow={`${progress}`}
        aria-valuemin={`${min}`}
        aria-valuemax={`${max}`}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{ width: `${((progress - min) / (max - min)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default SpinerWithProgress;
