import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutoComplete";
import { useState, useCallback } from "react";
import Recommendation from "./Recommendation";

//get address from DDB usig stalladdress
const mapStyles = {
  width: "1200px",
  height: "800px",
};

export default function UserMap(props) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(props.center);
  const [selected, setSelected] = useState(null);

  //On component mount
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(props.center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  //On component dismount
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //callback function for onclick to prevent re-rendering
  const onMapClick = useCallback(
    (event) => {
      setMarker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setMap(map);
    },[map]);

  const reCenter = useCallback(
    () => {
      setMarker({
        lat: props.center.lat,
        lng: props.center.lng,
      });
      const bounds = new window.google.maps.LatLngBounds(props.center);
      map.fitBounds(bounds);
      setMap(map)
    },[])

  return (
    <div>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} reCenter={reCenter} />
      </div>
      <GoogleMap
        zoom={10}
        center={props.center}
        mapContainerStyle={mapStyles}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
        }}
        onClick={onMapClick}
        style={{ zIndex: 0 }}
      >
        <MarkerF position={marker} />
      </GoogleMap>
      <Recommendation pos={marker}/>
    </div>
  );
}
