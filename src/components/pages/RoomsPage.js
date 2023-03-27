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

  const searchRooms = (par) => {
    props.searchRooms(
      { lat: par.lat, lon: par.lon },
      { start: par.startDate, end: par.endDate },
      params.filter
    );
  };

  useEffect(() => {
    searchRooms(params);
  }, []);

  const renderRoomCards = () => {
    if (props.rooms[0] === -1) {
      return (
        <div
          class="d-flex justify-content-center"
          style={{
            height: "80vh",
            alignItems: "center",
          }}
        >
          <h4>
            <strong>Pretraga... </strong>
          </h4>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Pronadjeno {props.rooms.length}</h2>
        {props.rooms.map((room, id) => (
          <div onClick={() => navigate(`/room/${room.id}`)} key={id}>
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    );
  };

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
              <SearchForm isSearchPage validate={() => {}} />
            </div>
          </div>
        </div>
        <div className="pc-form">
          <SearchForm isSearchPage validate={() => {}} />
        </div>
      </div>
      <div className="col-lg-9 col-12">{renderRoomCards()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { rooms: state.searchedRooms };
};

export default connect(mapStateToProps, { searchRooms })(RoomsPage);
