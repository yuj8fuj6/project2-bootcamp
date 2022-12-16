import React, {useEffect} from "react";
import { Header, NavBar } from "../components";
import { useJsApiLoader } from "@react-google-maps/api";
import UserMap from "../components/Map";

let center = {
  lat: null,
  lng: null,
}

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

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="center">
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <UserMap center={center}/>
    </div>
  );
}



