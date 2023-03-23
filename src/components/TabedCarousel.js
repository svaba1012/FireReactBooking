import React, { useState } from "react";

function getTabCountBefore(tabs, tabId) {
  return tabs.reduce((acc, el, id) => {
    if (id < tabId) {
      return acc + el.count;
    } else {
      return acc;
    }
  }, 0);
}

function TabedCarousel(props) {
  let [activeTab, setActiveTab] = useState(0);
  let slideId = 0;
  return (
    <div
      id={props.id}
      className="carousel slide"
      style={{ userSelect: "none" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "5px",
          // marginLeft: "15%",
          // marginRight: "15%",
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
            <h3>{tab.name}</h3>
          </div>
        ))}
      </div>
      <div
        className="carousel-indicators"
        style={{
          top: "30px",
          bottom: "inherit",
          marginLeft: "0px",
          marginRight: "0px",
        }}
      >
        {props.tabs.map((tab, id) => {
          let activeClass = "";
          if (id === 0) {
            activeClass = "active";
          }

          return [...Array(tab.count).keys()].map((el) => (
            <button
              key={slideId}
              type="button"
              data-bs-target={`#${props.id}`}
              data-bs-slide-to={`${slideId}`}
              className={activeClass}
              aria-label={`Slide ${++slideId}`}
              style={{
                width: `${100 / props.tabs.length / tab.count}%`,
                textIndent: "0px",
              }}
              onClick={() => {
                setActiveTab(getTabCountBefore(props.tabs, id) + el);
                props.onTabChanged(getTabCountBefore(props.tabs, id) + el);
              }}
            >
              {props.getTabText(tab.validTab[el])}
            </button>
          ));
        })}
      </div>
      <div
        className="carousel-inner"
        style={{ minHeight: "70vh", marginTop: "30px" }}
      >
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
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${props.id}`}
          data-bs-slide="prev"
          disabled={activeTab === 0}
          style={{
            position: "relative",
            border: "2px solid black",
            // opacity: activeTab === 0 ? "none" : "block",
          }}
          onClick={() => {
            setActiveTab(activeTab - 1);
            props.onTabChanged(activeTab - 1);
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next "
          type="button"
          data-bs-target={`#${props.id}`}
          data-bs-slide="next"
          style={{
            position: "relative",
            backgroundColor: "blue",
            padding: "5px 100px",
            marginLeft: "10px",
          }}
          onClick={() => {
            setActiveTab((activeTab + 1) % props.children.length);
            props.onTabChanged((activeTab + 1) % props.children.length);
          }}
        >
          Nastavi
        </button>
      </div>
    </div>
  );
}

export default TabedCarousel;
