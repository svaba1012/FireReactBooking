import { combineReducers } from "redux";
import { SEARCH_LOCATIONS, SEARCH_ROOMS } from "../actions/types";

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

const reducers = combineReducers({
  searchedRooms: searchRoomsReducer,
  searchedLocations: searchLocationReducer,
});

export default reducers;
