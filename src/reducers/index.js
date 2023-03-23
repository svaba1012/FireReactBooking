import { combineReducers } from "redux";
import {
  GET_LOCATIONS,
  GET_PLACE_CORDS,
  GET_ROOM_BY_ID,
  RESERVE_ROOM,
  SEARCH_LOCATIONS,
  SEARCH_ROOMS,
  SET_STAGE,
} from "../actions/types";

const searchRoomsReducer = (state = [], action) => {
  switch (action.type) {
    case SEARCH_ROOMS:
      return action.payload;
    default:
      return [...state];
  }
};

const searchLocationReducer = (state = [], action) => {
  switch (action.type) {
    case SEARCH_LOCATIONS:
      return action.payload;
    default:
      return [...state];
  }
};

const roomReducer = (state = null, action) => {
  switch (action.type) {
    case GET_ROOM_BY_ID:
      return action.payload;
    case RESERVE_ROOM:
      let newReservations = [...state.reservations];
      newReservations.push(action.payload);

      return {
        ...state,
        reservations: newReservations,
      };
    default:
      return { ...state };
  }
};

const locationReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.payload;
    default:
      return [...state];
  }
};

const stageReducer = (
  state = {
    loading: false,
    data: { min: 0, max: 100, progress: 60, text: "Hajde" },
  },
  action
) => {
  switch (action.type) {
    case SET_STAGE:
      return action.payload;
    default:
      return { ...state };
  }
};

const mapCenterReducer = (state = null, action) => {
  switch (action.type) {
    case GET_PLACE_CORDS:
      return action.payload;
    default:
      return { ...state };
  }
};

const reducers = combineReducers({
  searchedRooms: searchRoomsReducer,
  searchedLocations: searchLocationReducer,
  room: roomReducer,
  locations: locationReducer,
  stage: stageReducer,
  mapCenter: mapCenterReducer,
});

export default reducers;
