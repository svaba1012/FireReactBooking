import {
  addDoc,
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { INSERT_ROOM, SEARCH_LOCATIONS, SEARCH_ROOMS } from "./types";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";

const MAX_FETCH_OBJ = 5;

export const searchRooms1 =
  (criteria = [], location = "Beograd") =>
  async (dispatch) => {
    const roomsRef = collection(db, "rooms");
    if (location) {
      const locationRef = collection(db, "locations");
      const locQuery = query(locationRef, where("name", "==", location));
      const locQuerySnapshot = await getDocs(locQuery);
      console.log(locQuerySnapshot);
      if (locQuerySnapshot.docs.length > 0) {
        let locId = locQuerySnapshot.docs[0].id;
        criteria.push(["locationId", "==", locId]);
      }
    } else {
      criteria.push(["locationId", "!=", "0"]);
    }
    const q = query(
      roomsRef,
      ...criteria.map((el) => where(...el)),
      limit(MAX_FETCH_OBJ)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    let rooms = querySnapshot.docs.map((el) => {
      // console.log(el.data().location.id);
      // const locationRef = collection(db, "locations", el.data().location.id);
      // const locationData = await getDocs(locationRef);
      // console.log(locationData);
      console.log(el.data());
      return {
        ...el.data(),
        // location: el.data().location.name,
        id: el.id,
      };
    });
    dispatch({
      type: SEARCH_ROOMS,
      payload: rooms,
    });
  };

export const searchRooms =
  (location = null, date = null, criteria = null) =>
  async (dispatch) => {
    // get location id
    if (!location) {
      return;
    }
    let locId;
    const locationRef = collection(db, "locations");
    const locQuery = query(locationRef, where("name", "==", location));
    const locQuerySnapshot = await getDocs(locQuery);
    if (locQuerySnapshot.docs.length > 0) {
      locId = locQuerySnapshot.docs[0].id;
    }
    const reservationRef = collection(db, "reservations");
    const reservationQuery = query(
      reservationRef,
      where("locationId", "==", locId)
    );

    // get already reserved rooms for searched period
    const reservationQuerySnapshot = await getDocs(reservationQuery);
    let reservations = reservationQuerySnapshot.docs.map((el) => {
      return { ...el.data(), id: el.id };
    });
    reservations = reservations.filter((res) => {
      console.log(res.startDate < date.start && res.endDate > date.start);
      console.log(res.startDate < date.end && res.endDate > date.end);
      console.log(res.startDate > date.start && res.endDate < date.end);

      return (
        (res.startDate < date.start && res.endDate > date.start) ||
        (res.startDate < date.end && res.endDate > date.end) ||
        (res.startDate > date.start && res.endDate < date.end)
      );
    });

    let reservationRoomsIds = reservations.map((res) => res.roomId);
    if (reservationRoomsIds.length === 0) {
      reservationRoomsIds.push("0");
    }
    console.log(reservationRoomsIds);
    const roomsRef = collection(db, "rooms");
    const roomsQuery = query(
      roomsRef,
      where("__name__", "not-in", reservationRoomsIds),
      where("locationId", "==", locId)
    );

    const roomsQuerySnapshot = await getDocs(roomsQuery);
    let rooms = roomsQuerySnapshot.docs.map((room) => {
      return { ...room.data(), id: room.id };
    });
    console.log(rooms);
    dispatch({
      type: SEARCH_ROOMS,
      payload: rooms,
    });
  };

export const searchLocations = (searchStr) => async (dispatch) => {
  const locationRef = collection(db, "locations");
  const q = query(
    locationRef,
    orderBy("name"),
    startAt(searchStr),
    endAt(searchStr + "\uf8ff"),
    limit(5)
  );
  const querySnapshot = await getDocs(q);
  let locations = querySnapshot.docs.map((el) => {
    return { ...el.data(), id: el.id };
  });
  dispatch({ type: SEARCH_LOCATIONS, payload: locations });
};

export const insertRoom = (room) => async (dispatch) => {
  const roomRef = collection(db, "rooms");
  let res;
  let picsFolder = `pics-${v4()}`;
  await Promise.all(
    room.pics.map(async (pic) => {
      const picRef = ref(storage, `${picsFolder}/pic-${v4()}`);
      try {
        await uploadBytes(picRef, pic);
      } catch (e) {
        console.error(e);
      }
    })
  );
  room.pics = picsFolder;
  try {
    res = await addDoc(roomRef, room);
  } catch (e) {
    console.error(e);
    res = e;
  }
  console.log("ENDE");
  dispatch({ type: INSERT_ROOM, payload: res });
};
