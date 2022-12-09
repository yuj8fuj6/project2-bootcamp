import React from "react";
import { Header, NavBar } from "../components";
import { useState, useEffect, useMemo, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete } from "@react-google-maps/api";
import { getDatabase, ref, child, get } from "firebase/database";

//get address from DDB usig stalladdress
const mapStyles = {
  width: "1200px",
  height: "800px",
};

let center = {
  lat: null,
  lng: null
}

const Search = () => {

  //Initialise users's startinng location
  useEffect(() => {
     navigator.geolocation.getCurrentPosition((position) => {
       center.lat = position.coords.latitude
       center.lng = position.coords.longitude
    })
  })

  //Get hawker's location from database
  const dbRef = ref(getDatabase());
  get(child(dbRef, `hawkers/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let ss = Object.values(snapshot.val())
        console.log(ss)
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  // const [latitude, setLatitude] = useState(null);
  // const [longtitude, setLongtitude] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(center);

  //On component mount
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(marker);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  //On component dismount
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //Check if the api call and map is loaded
  //load api keys
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEYS,
    libraries: ["places"], //libraries for api
  });

  //callback function for onclick to prevent re-rendering
  const onMapClick = useCallback(
    (event) => {
      setMarker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setMap(map);
    },
    [map]
  );

  if (!isLoaded) {
    return <p>Error Loading Map</p>;
  }

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>Search</div>
      <div>
        {isLoaded ? (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={mapStyles}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
            }}
            onClick={onMapClick}
          >
            <MarkerF position={marker} />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Search;
