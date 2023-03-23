import {
  addDoc,
  collection,
  endAt,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { auth, db, getUserData, storage } from "../config/firebase";
import {
  GET_LOCATIONS,
  GET_PLACE_CORDS,
  GET_ROOM_BY_ID,
  INSERT_REVIEW,
  INSERT_ROOM,
  RESERVE_ROOM,
  SEARCH_LOCATIONS,
  SEARCH_ROOMS,
  SET_STAGE,
} from "./types";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import geoapify from "../api/geoapify";

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
      return (
        (res.startDate <= date.start && res.endDate >= date.start) ||
        (res.startDate <= date.end && res.endDate >= date.end) ||
        (res.startDate >= date.start && res.endDate <= date.end)
      );
    });

    let reservationRoomsIds = reservations.map((res) => res.roomId);
    if (reservationRoomsIds.length === 0) {
      reservationRoomsIds.push("0");
    }
    const roomsRef = collection(db, "rooms");
    const roomsQuery = query(
      roomsRef,
      where("__name__", "not-in", reservationRoomsIds),
      where("locationId", "==", locId)
    );

    const roomsQuerySnapshot = await getDocs(roomsQuery);
    let rooms = roomsQuerySnapshot.docs.map((room) => {
      return { ...room.data(), id: room.id, location: location };
    });
    let reviewRef = collection(db, "reviews");
    rooms = await Promise.all(
      rooms.map(async (room) => {
        let imageRef = ref(storage, `${room.pics}/${room.mainPic}`);
        let mainPicUrl = await getDownloadURL(imageRef);
        let reviewQuery = query(reviewRef, where("roomId", "==", room.id));
        let res = await getDocs(reviewQuery);
        let reviews = res.docs.map((el) => {
          return { ...el.data(), id: el.id };
        });
        let revLen = reviews.length;
        let rating = null;
        if (revLen > 0) {
          rating =
            reviews.reduce((acc, rev) => {
              return (
                acc +
                (rev.evalLocation +
                  rev.evalStuff +
                  rev.evalClean +
                  rev.evalThings +
                  rev.evalPrice +
                  rev.evalComfor) /
                  6
              );
            }, 0) / revLen;
          rating = Math.round(rating * 100) / 100;
        }

        return {
          ...room,
          mainPicUrl: mainPicUrl,
          reviews: { count: revLen, rating: rating },
        };
      })
    );

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

  locations = await Promise.all(
    locations.map(async (loc) => {
      let roomRef = collection(db, "rooms");
      let roomQuery = query(roomRef, where("locationId", "==", loc.id));
      let snapshot = await getCountFromServer(roomQuery);
      let roomsCount = snapshot.data().count;

      return { ...loc, numOfRooms: roomsCount };
    })
  );

  dispatch({ type: SEARCH_LOCATIONS, payload: locations });
};

export const insertRoom = (room, navigate) => async (dispatch) => {
  const roomRef = collection(db, "rooms");
  let res;
  let picsFolder = `pics-${v4()}`;
  let numOfSentPics = 0;
  await Promise.all(
    room.pics.map(async (pic, id) => {
      let imageName = `pic-${v4()}`;
      const picRef = ref(storage, `${picsFolder}/${imageName}`);
      if (room.mainPicId === id) {
        room.mainPic = imageName;
      }

      try {
        await uploadBytes(picRef, pic);
        numOfSentPics++;
        dispatch({
          type: SET_STAGE,
          payload: {
            loading: true,
            phase: true,
            data: {
              min: 0,
              max: room.pics.length,
              progress: numOfSentPics,
              text: `Slanje slika(${numOfSentPics} od ${room.pics.length})`,
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    })
  );
  room.pics = picsFolder;
  dispatch({
    type: SET_STAGE,
    payload: {
      loading: true,
      phase: true,
      data: {
        min: 0,
        max: 100,
        progress: 98,
        text: `Slanje ostalih podataka`,
      },
    },
  });

  try {
    res = await addDoc(roomRef, room);
    console.log(res);
    dispatch({ type: INSERT_ROOM, payload: res });
    dispatch({
      type: SET_STAGE,
      payload: {
        loading: true,
        phase: true,
        data: {
          min: 0,
          max: 100,
          progress: 100,
          text: `Uspesno ste registrovali smestaj`,
        },
      },
    });
    setTimeout(() => {
      dispatch({
        type: SET_STAGE,
        payload: {
          loading: false,
          phase: true,
          data: null,
        },
      });
      navigate(`/room/${res.id}`);
    }, 3000);
  } catch (e) {
    console.error(e);
    res = e;
  }
};

export const getRoomById = (id) => async (dispatch) => {
  let roomRef = collection(db, "rooms");
  let roomQuery = query(roomRef, where("__name__", "==", id));
  let res = await getDocs(roomQuery);
  let room = res.docs.map((el) => {
    return { ...el.data(), id: el.id };
  });
  room = room[0];
  let locationRef = collection(db, "locations");
  let locationQuery = query(
    locationRef,
    where("__name__", "==", room.locationId)
  );
  res = await getDocs(locationQuery);
  let locations = res.docs.map((el) => {
    return { ...el.data(), id: el.id };
  });
  room.location = locations[0].name;

  let reservationRef = collection(db, "reservations");
  let reservationQuery = query(reservationRef, where("roomId", "==", id));
  res = await getDocs(reservationQuery);
  let reservations = res.docs.map((el) => {
    return { ...el.data(), id: el.id };
  });
  room.reservations = reservations;
  let reviewRef = collection(db, "reviews");
  let reviewQuery = query(reviewRef, where("roomId", "==", id));
  res = await getDocs(reviewQuery);
  let reviews = res.docs.map((el) => {
    return { ...el.data(), id: el.id };
  });
  // console.log(reviews);
  room.reviews = reviews;

  let imagesRef = ref(storage, room.pics + "/");
  let response = await listAll(imagesRef);
  let images = await Promise.all(
    response.items.map(async (el) => {
      let url = await getDownloadURL(el);
      return url;
    })
  );
  room.imagesUrl = images;
  dispatch({ type: GET_ROOM_BY_ID, payload: room });
};

export const getLocations = () => async (dispatch) => {
  let locationRef = collection(db, "locations");
  let res = await getDocs(locationRef);
  let locations = res.docs.map((el) => {
    return { ...el.data(), id: el.id };
  });

  dispatch({ type: GET_LOCATIONS, payload: locations });
};

export const reserveRoom = (room, dates) => async (dispatch, getState) => {
  let reservationRef = collection(db, "reservations");
  let reservation = {
    startDate: dates.startDate.getTime() / 1000,
    endDate: dates.endDate.getTime() / 1000,
    roomId: room.id,
    locationId: room.locationId,
    userId: "",
  };

  await addDoc(reservationRef, reservation);
  dispatch({ type: RESERVE_ROOM, payload: reservation });
};

export const setStage =
  (
    loading,
    phase = 0,
    data = { min: 0, max: 100, progress: 60, text: "Hajde" }
  ) =>
  async (dispatch) => {
    dispatch({ type: SET_STAGE, payload: { loading, phase, data } });
    // return { type: SET_STAGE, payload: { id, data } };
  };

export const insertReview = (review, userId) => async (dispatch, getState) => {
  let reviewRef = collection(db, "reviews");
  let time = new Date();
  time = time.getTime() / 1000;
  let dbReview = {
    ...review,
    roomId: getState().room.id,
    user: {
      name: auth.currentUser.displayName,
      pic: auth.currentUser.photoURL,
    },
    userId: userId,
    date: time,
  };

  await addDoc(reviewRef, dbReview);
  dispatch({ type: INSERT_REVIEW, payload: dbReview });
};

export const getPlaceCords = (address) => async (dispatch, getState) => {
  let res = await geoapify.get("/geocode/search", {
    params: { text: address, type: "street" },
  });

  dispatch({ type: GET_PLACE_CORDS, payload: res.data.features[0].properties });
};
