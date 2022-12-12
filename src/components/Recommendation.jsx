import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Recommendation(props){
  //Get hawker's location from database
  const dbRef = ref(getDatabase());
  get(child(dbRef, `hawkers/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let ss = Object.values(snapshot.val());
        console.log(ss);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

    return (
      <div>
        <h3>Stalls Near You</h3>
        
      </div>
    )
}