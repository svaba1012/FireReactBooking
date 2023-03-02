import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../actions";
import ReservationForm from "../forms/ReservationForm";
import ImageCarousel from "../ImageCarousel";

function RoomPage(props) {
  let params = useParams();
  useEffect(() => {
    props.getRoomById(params.id);
  }, []);
  if (!props.room.id) {
    return <div></div>;
  }

  console.log(props.room);

  return (
    <div>
      <h2>{props.room.name}</h2>
      <h5>
        <i class="bi bi-geo-alt-fill"></i>
        {props.room.address}, {props.room.location} - Prikazi mapu
      </h5>
      <ImageCarousel
        id="imageSlide"
        images={[
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
          "https://www.slikomania.rs/fotky6509/fotos/slike-na-platnu_XOBZV030E11E11-gal2.jpg",
        ]}
      ></ImageCarousel>
      <div style={{ marginTop: "250px" }}>
        <p className="lead">
          {props.room.description} asdkaslkdk lmaskld masklklask ldas daksldasdk
          maskdlmasd
        </p>
      </div>
      <ReservationForm room={props.room}></ReservationForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { room: state.room };
};

export default connect(mapStateToProps, { getRoomById })(RoomPage);
