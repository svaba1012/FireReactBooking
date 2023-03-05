import React, { useEffect } from "react";
import { searchRooms } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RoomCard from "../RoomCard";
import SearchForm from "../forms/SearchForm";
import { useSearchParams } from "react-router-dom";

function RoomsPage(props) {
  let [queryParams] = useSearchParams();
  let params = Object.fromEntries([...queryParams]);
  useEffect(() => {
    props.searchRooms(
      params.location,
      { start: params.startDate, end: params.endDate },
      params.filter
    );
  });

  return (
    <div className="row align-items-start">
      <div className="col-3">
        <SearchForm onSubmit={() => {}} validate={() => {}} />
      </div>
      <div className="col-9">
        <h2>Pronadjeno {props.rooms.length}</h2>
        {props.rooms.map((room, id) => (
          <Link
            key={id}
            to={`/room/${room.id}`}
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <RoomCard room={room} />
          </Link>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { rooms: state.searchedRooms };
};

export default connect(mapStateToProps, { searchRooms })(RoomsPage);
