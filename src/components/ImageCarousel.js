import React, { useRef, useState } from "react";
import PictureModal from "./modals/PictureModal";

let timeOutId = null;

function ImageCarousel(props) {
  let [selectedImage, setSelectedImage] = useState(0);
  let [isPicModalOpen, setIsPicModalOpen] = useState(false);
  let [imgUrl, setImgUrl] = useState(null);
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
    <div id={props.id} className="carousel slide">
      <PictureModal
        isOpen={isPicModalOpen}
        setIsOpen={setIsPicModalOpen}
        imgUrl={imgUrl}
      ></PictureModal>
      <div
        className="carousel-indicators"
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
              key={el}
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
      <div className="carousel-inner">
        {props.images.map((image, id) => {
          let styleClass = "carousel-item ";
          if (id === 0) {
            styleClass += "active";
          }
          return (
            <div className={styleClass} key={id}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={image}
                  alt="Slika"
                  style={{ maxHeight: "60vh", cursor: "pointer" }}
                  onClick={() => {
                    setImgUrl(image);
                    setIsPicModalOpen(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${props.id}`}
        data-bs-slide="prev"
        onClick={() => {
          if (!timeOutId) {
            timeOutId = setTimeout(() => {
              if (selectedImage === 0) {
                changeActiveImage(props.images.length - 1);
              } else {
                changeActiveImage(selectedImage - 1);
              }
              timeOutId = null;
            }, 600);
          }
        }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${props.id}`}
        data-bs-slide="next"
        onClick={() => {
          if (!timeOutId) {
            timeOutId = setTimeout(() => {
              if (selectedImage === props.images.length - 1) {
                changeActiveImage(0);
              } else {
                changeActiveImage(selectedImage + 1);
              }
              timeOutId = null;
            }, 600);
          }
        }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ImageCarousel;
