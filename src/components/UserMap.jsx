import React from "react";
import { GoogleMap, MarkerF, panTo } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutoComplete";
import { useState, useCallback } from "react";
import Recommendation from "./Recommendation";
import ContactForm from "./ContactForm";


//get address from DDB usig stalladdress
const mapStyles = {
  width: "100%",
  height: "100%",
};

export default function UserMap(props) {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(props.center);
 
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
      setPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setMap(map);
    },[map]);

  const reCenter = useCallback(function callback(map){
    setPosition({
      lat: props.center.lat,
      lng: props.center.lng,
    });
    const bounds = new window.google.maps.LatLngBounds(props.center);
    map.fitBounds(bounds);
    map.panTo({
      lat: props.center.lat,
      lng: props.center.lng,
    });
    setMap(map);
  }, []); 



  return (
    <div className="map-container ">
      <div>
        <PlacesAutocomplete setSelected={setPosition} reCenter={reCenter} />
      </div>
      <GoogleMap
        zoom={10}
        center={position}
        mapContainerStyle={mapStyles}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
        }}
        onClick={onMapClick}
      >
        <MarkerF position={position} />
      </GoogleMap>
      <Recommendation pos={position} />
      <div className="bg-orange">
        <div className="p-5" id="feedback">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
