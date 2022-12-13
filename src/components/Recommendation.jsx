import React from "react";
import { getDatabase, ref, child, get, set } from "firebase/database";
import Card from "./Card";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";
var geohash = require("ngeohash");
const dbRef = ref(getDatabase());

// const neighboursOf = require('geohash-neighbours').neighboursOf
// const northeastOf = require("geohash-neighbours").northeastOf;
// const northOf = require("geohash-neighbours").northOf;
// const northwestOf = require("geohash-neighbours").northwestOf;
// const southwestOf = require("geohash-neighbours").southwestOf;
// const southOf = require("geohash-neighbours").southOf;
// const southeastOf = require("geohash-neighbours").southeastOf;


Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEYS}`);

export default function Recommendation(props) {
  const [hawkerData, setHawkerData] = useState([]);
  const [temp, setTemp] = useState({})
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
              geoHash: getGeohash(hawker.stallAddress),
            }))
          );
        });
    }
    getData();
  }, []);

  console.log(hawkerData)

  //Get Neightbours
  // let neighbours = neighboursOf(geohash.encode(props.pos.lat, props.pos.lng, 6));
  // neighbours.push(
  //   northwestOf(neighbours[1]),
  //   northOf(neighbours[1]),
  //   northeastOf(neighbours[1]),
  //   southwestOf(neighbours[6]),
  //   southOf(neighbours[6]),
  //   southeastOf(neighbours[6]),
  // );

  // let nearbyStalls = []
  // for(let i = 0; i < hawkerData.length && ; i++)



  return (
    <div>
      <h3>Stalls Near You</h3>
      <Card />
    </div>
  );
}

function getGeohash(address) {
  let convertGeohash = async function (address) {
    let response = await getLocation(address);
    const { lat, lng } = response.results[0].geometry.location;
    return geohash.encode(lat, lng, 6);
  };

  return convertGeohash(address)
}

// let convertGeohash = async function(address){
//   let response = await getLocation(address)
//   const { lat, lng } = response.results[0].geometry.location;
//   return geohash.encode(lat, lng, 6)
// }

let getLocation = function(address){
  return Geocode.fromAddress(address)
}

