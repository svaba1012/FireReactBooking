import React, { useEffect } from "react";
import { searchRooms } from "../../actions";
import { connect } from "react-redux";
import RoomCard from "../RoomCard";
import SearchForm from "../forms/SearchForm";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./RoomsPage.css";

function RoomsPage(props) {
  let [queryParams] = useSearchParams();
  let navigate = useNavigate();
  let params = Object.fromEntries([...queryParams]);
  useEffect(() => {
    props.searchRooms(
      { lat: params.lat, lon: params.lon },
      { start: params.startDate, end: params.endDate },
      params.filter
    );
  }, []);

  return (
    <div className="row align-items-start">
      <div className="col-lg-3 col-12">
        <div className="mobile-form">
          <p>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
            >
              <i class="fa-solid fa-bars"></i>
            </button>
          </p>
          <div style={{ minHeight: "20px" }}>
            <div className="collapse" id="collapseWidthExample">
              <SearchForm onSubmit={() => {}} validate={() => {}} />
            </div>
          </div>
        </div>
        <div className="pc-form">
          <SearchForm onSubmit={() => {}} validate={() => {}} />
        </div>
      </div>
      <div className="col-lg-9 col-12">
        <h2>Pronadjeno {props.rooms.length}</h2>
        {props.rooms.map((room, id) => (
          <div onClick={() => navigate(`/room/${room.id}`)} key={id}>
            {/* <Link
            key={id}
            to={`/room/${room.id}`}
            style={{ textDecoration: "inherit", color: "inherit" }}
          > */}
            <RoomCard room={room} />
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { rooms: state.searchedRooms };
};

export default connect(mapStateToProps, { searchRooms })(RoomsPage);
