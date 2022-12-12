import React from "react";
import { getDatabase, ref, child, get, set } from "firebase/database";
import Card from "./Card";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";
var geohash = require("ngeohash");
const dbRef = ref(getDatabase());
Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEYS}`);

export default function Recommendation(props) {
  const [hawkerData, setHawkerData] = useState([]);
  //Get hawker's data from database
  useEffect(() => {
    async function getData() {
      let data;
      await get(child(dbRef, `hawkers/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            data = Object.values(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          setHawkerData(
            data.map((hawker) => ({
              ...hawker,
              geoHash: convertGeohash(hawker.stallAddress),
            }))
          );
        });
    }
    getData();
  }, []);

  console.log(hawkerData);

  return (
    <div>
      <h3>Stalls Near You</h3>
      <Card />
    </div>
  );
}

function convertGeohash(address) {
  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return geohash.encode(lat, lng, 6);
    },
    (error) => {
      console.error(error);
    }
  );
}
