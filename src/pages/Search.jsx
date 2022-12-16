import React, {useEffect} from "react";
import { Header, NavBar } from "../components";
import { useJsApiLoader } from "@react-google-maps/api";
import UserMap from "../components/UserMap";
import { useState } from "react";

let center = {
  lat: null,
  lng: null,
}

export default function Search() {
  const [permission, setPermission] = useState(true) //user permission of location
  //Initialise users's starting location
   useEffect(() => {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         center.lat = position.coords.latitude;
         center.lng = position.coords.longitude;
       },
       function (error) {
         if (error.code === error.PERMISSION_DENIED)
          setPermission(false);
       }
     );
   },[permission]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEYS,
    libraries: ["places"], //libraries for api
  });

  if (!isLoaded) return <div>Loading...</div>;
  else return (
    <div className="center">
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      {permission ? <UserMap center={center} /> : <p>Please allow me to eat you</p>}
    </div>
  );
}



