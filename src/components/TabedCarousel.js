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
              position: "relative",

              width: `${100 / props.tabs.length}%`,
              height: "30px",
              marginBottom: "0px",
            }}
            className=""
            key={id}
          >
            <h4
              style={{
                position: "absolute",
                bottom: "0px",

                width: "100%",
                textAlign: "center",
                marginBottom: "0px",
                fontSize: "1.4em",
              }}
            >
              {tab.name}
            </h4>
          </div>
        ))}
      </div>
      <div
        className="carousel-indicators"
        style={{
          // top: "30px",
          // bottom: "inherit",
          marginLeft: "0px",
          marginRight: "0px",
          position: "relative",
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
                borderTopWidth: "2px",
              }}
              onClick={() => {
                props.onTabChanged(
                  activeTab,
                  getTabCountBefore(props.tabs, id) + el
                );
                setActiveTab(getTabCountBefore(props.tabs, id) + el);
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
            props.onTabChanged(activeTab, activeTab - 1);
            setActiveTab(activeTab - 1);
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
            if (activeTab === 7) {
              props.onNextSlideBtnClick();
            } else {
              props.onTabChanged(
                activeTab,
                (activeTab + 1) % props.children.length
              );
              setActiveTab((activeTab + 1) % props.children.length);
            }
          }}
        >
          {activeTab !== 7 ? "Nastavi" : "Registruj"}
        </button>
      </div>
    </div>
  );
}

export default TabedCarousel;
