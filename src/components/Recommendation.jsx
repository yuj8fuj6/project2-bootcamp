import React from "react";
import { getDatabase, ref, child, get} from "firebase/database";
import Card from "./Card";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";
var geohash = require("ngeohash");
const dbRef = ref(getDatabase());
const arr = [[[1, -1],[-1,-1]],[[1, 0],[-1,0]],[[1, 1],[-1,1]]] //arr for directions of neighbour of geohash

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEYS}`);

export default function Recommendation({ pos }) {
  const [hawkerData, setHawkerData] = useState([]);
  const [stalls, setStalls] = useState([])
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
          let temp = Promise.all(
            data.map(async (hawker) => ({
              ...hawker,
              geoHash: await getGeohash(hawker.stallAddress),
            }))
          );
          return temp
        })
        .then((results) => {
          setHawkerData(results)
        })
    }
    getData();
    setStalls(getNearbyStalls(pos, hawkerData))
  }, []);

  console.log(stalls)

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

let getLocation = function(address){
  return Geocode.fromAddress(address)
}

function getNearbyStalls(pos, hawkerData){
  let neighbours = getNeighbours(pos)
  let stalls = getStalls(neighbours, hawkerData)
  return stalls
}

function getNeighbours(pos){
  //Get Neighbours
  // let loc = geohash.encode(pos.lat, pos.lng, 6);
  let loc = "w21z70";
  let neighbours = [...geohash.neighbors(loc), loc];
  for (let i = 0; i <= 2; i++) {
    neighbours.push(
      geohash.neighbor(neighbours[0], arr[i][0]),
      geohash.neighbor(neighbours[4], arr[i][0])
    );
  }
  return neighbours
}

function getStalls(neighbours, hawkerData){
   let i = 0;
   let nearbystalls = [];
   while (i < neighbours.length && nearbystalls.length <= 10) {
     nearbystalls.push(
       ...hawkerData.filter((ele) => {
         return ele.geoHash === neighbours[i];
       })
     );
     i++;
   }
   return nearbystalls
}
