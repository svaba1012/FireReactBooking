import React from "react";

function TabedCarousel(props) {
  return (
    <div id={props.id} class="carousel slide">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "5px",
          marginLeft: "15%",
          marginRight: "15%",
        }}
      >
        {props.tabs.map((tab, id) => (
          <div
            style={{
              textAlign: "center",
              width: `${100 / props.tabs.length}%`,
            }}
            key={id}
          >
            <h3>{tab}</h3>
          </div>
        ))}
      </div>
      <div class="carousel-indicators" style={{ top: "30px" }}>
        {props.tabs.map((tab, id) => {
          let activeClass = "";
          if (id === 0) {
            activeClass = "active";
          }
          return (
            <button
              key={id}
              type="button"
              data-bs-target={`#${props.id}`}
              data-bs-slide-to={`${id}`}
              className={activeClass}
              aria-label={`Slide ${id + 1}`}
              style={{ width: `${100 / props.tabs.length}%` }}
            ></button>
          );
        })}
      </div>
      <div class="carousel-inner">
        {props.children.map((child, id) => {
          let styleClass = "carousel-item ";
          if (id === 0) {
            styleClass += "active";
          }
          return (
            <div className={styleClass} key={id}>
              {child}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex" }}>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target={`#${props.id}`}
          data-bs-slide="prev"
          style={{ position: "relative", border: "2px solid black" }}
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next "
          type="button"
          data-bs-target={`#${props.id}`}
          data-bs-slide="next"
          style={{
            position: "relative",
            backgroundColor: "blue",
            padding: "5px 100px",
            marginLeft: "10px",
          }}
        >
          Nastavi
        </button>
      </div>
    </div>
  );
}

export default TabedCarousel;
