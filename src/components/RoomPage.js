import React, { useEffect } from "react";
import { searchRooms } from "../actions";
import { connect } from "react-redux";
import RoomCard from "./RoomCard";
import SearchForm from "./SearchForm";

function RoomPage(props) {
  useEffect(() => {
    props.searchRooms();
  }, []);

  return (
    <div class="row align-items-start">
      <div class="col-3">
        <SearchForm onSubmit={() => {}} validate={() => {}} />
      </div>
      <div class="col-9">
        <h2>Pronadjeno {props.rooms.length}</h2>
        {props.rooms.map((room, id) => (
          <RoomCard room={room} key={id} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { rooms: state.searchedRooms };
};

export default connect(mapStateToProps, { searchRooms })(RoomPage);
