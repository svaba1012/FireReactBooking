import React, { useRef, useState } from "react";

function ImageCarousel(props) {
  let [selectedImage, setSelectedImage] = useState(0);
  let indicatorsRef = useRef();
  const changeActiveImage = (id) => {
    setSelectedImage(id);
    if (id > 3) {
      indicatorsRef.current.scroll({
        left: 40 + (id - 3) * 106,
        behavior: "smooth",
      });
    } else {
      indicatorsRef.current.scroll({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id={props.id} class="carousel slide">
      <div
        class="carousel-indicators"
        ref={indicatorsRef}
        style={{
          overflowX: "hidden",
          height: "100px",
          bottom: "-150px",
          justifyContent: "normal",
        }}
      >
        {props.images.map((image, el) => {
          let styleClass = "";
          if (el === 0) {
            styleClass = "active";
          }
          let imageStyle = { width: "inherit", borderRadius: "5px" };
          if (el === selectedImage) {
            imageStyle = { ...imageStyle, border: "3px solid blue" };
          }

          return (
            <button
              type="button"
              data-bs-target={`#${props.id}`}
              data-bs-slide-to={el}
              aria-current="true"
              className={styleClass}
              aria-label={`Slide ${el}`}
              style={{ textIndent: "0px", width: "100px" }}
              onClick={() => changeActiveImage(el)}
            >
              <img src={image} alt="Slika" style={imageStyle} />
            </button>
          );
        })}
      </div>
      <div class="carousel-inner">
        {props.images.map((image, id) => {
          let styleClass = "carousel-item ";
          if (id === 0) {
            styleClass += "active";
          }
          return (
            <div className={styleClass}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={image} alt="Slika" style={{ maxHeight: "60vh" }} />
              </div>
            </div>
          );
        })}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target={`#${props.id}`}
        data-bs-slide="prev"
        onClick={() => {
          if (selectedImage === 0) {
            changeActiveImage(props.images.length - 1);
          } else {
            changeActiveImage(selectedImage - 1);
          }
        }}
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target={`#${props.id}`}
        data-bs-slide="next"
        onClick={() => {
          if (selectedImage === props.images.length - 1) {
            changeActiveImage(0);
          } else {
            changeActiveImage(selectedImage + 1);
          }
        }}
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ImageCarousel;
