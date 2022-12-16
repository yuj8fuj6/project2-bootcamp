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
  async function getData() {
    let data, keys;
    const snapshot = await get(child(dbRef, `hawkers/`));
    if (snapshot.exists()) {
      data = Object.values(snapshot.val());
      keys = Object.keys(snapshot.val());
    } else {
      console.log("No data available");
    }
    Promise.all(
      data.map(async (hawker, i) => ({
        ...hawker,
        geoHash: await getGeohash(hawker.stallAddress),
        currentHawkerKey: keys[i], //temp fix
      }))
    ).then((result) => {
      setHawkerData(result);
      setStalls(getNearbyStalls(pos, result));
    });
  }

  useEffect(() => {
    getData()
  }, [pos]);


  if(hawkerData){
    if(stalls.length > 0){
      let element = stalls.map((ele) => {
        return <Card stall={ele} />;
      });
      return (
        <div className="center ">
          <h1 className="text-orange font-bold text-xl mb-2 mt-3">
            Stalls Near You
          </h1>
          {element}
        </div>
      );
    }
    else{
      return (
        <p className="text-orange font-bold text-xl mb-2 my-10">
          {" "}
          There is no stalls near you
        </p>
      );
    }
  }
  else{
    return <p>Loading...</p>
  }
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
  let loc = geohash.encode(pos.lat, pos.lng, 6);
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
   return [...new Set(nearbystalls)];
}
