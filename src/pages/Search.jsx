import React from "react";
import { Header, NavBar } from "../components";
import { useState, useEffect, useMemo, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF} from "@react-google-maps/api";
import { getDatabase, ref, child, get } from "firebase/database";
import UserMap from "../components/Map";

let center = {
  lat: null,
  lng: null,
};


export default function Search() {

  //Initialise users's startinng location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      center.lat = position.coords.latitude;
      center.lng = position.coords.longitude;
    });
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEYS,
    libraries: ["places"], //libraries for api
  });

  //Get hawker's location from database
  const dbRef = ref(getDatabase());
  get(child(dbRef, `hawkers/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let ss = Object.values(snapshot.val());
        console.log(ss);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="main">
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <UserMap center={center}/>
      </div>
    </div>
  );
}



