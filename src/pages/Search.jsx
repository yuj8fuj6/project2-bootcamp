import React from "react";
import { Header, NavBar } from "../components";
import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, LoadScript } from "@react-google-maps/api";
import { useCallback } from "react";
//get address from DDB usig stalladdress
const mapStyles = {
  width: "400px",
  height: "400px",
};

const center = { lat: 0, lng: 10 };

const Search = () => {
  // const [latitude, setLatitude] = useState(null);
  // const [longtitude, setLongtitude] = useState(null);
   const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEYS,
  });

  console.log({ isLoaded });

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: -3.745,
      lng: -38.523,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, [])

  //Only recalculate latitude and longtitude of user if it is changed to avoid center gettting re-render

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
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Search;
