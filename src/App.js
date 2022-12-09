import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  CreateStall,
  Dish,
  Landing,
  Order,
  Registration,
  Search,
  Stall,
  UserProfile,
} from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase";
import {
  onChildAdded,
  ref as databaseRef,
  getDatabase,
  query,
  equalTo,
  get,
  orderByChild,
  onValue,
} from "firebase/database";
import Login from "./pages/Login";
import CreateDish from "./pages/CreateDish";
import EditStall from "./pages/EditStall";
import EditDish from "./pages/EditDish";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState("");
  const [dishData, setDishData] = useState([]);
  const [hawkerData, setHawkerData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  }, []);

  // console.log(user.uid);

  const fetchUserDetails = useCallback(() => {
    //   console.log(user)
    //   const db = getDatabase();
    //   const currentUser = query(
    //     databaseRef(db, "users/"),
    //     orderByChild("contactEmail"),
    //     equalTo(`${user.email}`),
    //   );
    //   get(currentUser).then((snapshot) => {
    //     console.log(snapshot.val());
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val())
    //       const [user] = Object.values(snapshot.val());
    //       console.log(user);
    //       setUserDetails(user);
    //     }
    //   });
    // },[user]);

    //   useEffect(() => {
    //     fetchUserDetails();
    //   }, [user, fetchUserDetails]);

    console.log(user);
    const db = getDatabase();
    const currentUser = query(databaseRef(db, `users/${user.uid}`));
    onValue(currentUser, (snapshot) => {
      if (snapshot.exists()) {
        setUserDetails({ ...snapshot.val(), uid: user.uid });
      }
    });
  }, [user]);

  const clearUserDetails = () => setUserDetails(null);

  useEffect(() => {
    fetchUserDetails();
  }, [user, fetchUserDetails]);

  // console.log(userDetails);

  const DISHES_FOLDER_NAME = "dishes";

  const dishDataRef = databaseRef(database, DISHES_FOLDER_NAME);

  useEffect(() => {
    const dish = [];
    onChildAdded(dishDataRef, (data) => {
      dish.push({ key: data.key, val: data.val() });
      setDishData([...dish]);
    });

    onChildAdded(hawkerDataRef, (data) => {
      setHawkerData((prevHawkerData) => [
        ...prevHawkerData,
        { key: data.key, ...data.val() },
      ]);
    });
  }, []);

  // console.log(dishData);

  const HAWKERS_FOLDER_NAME = "hawkers";

  const hawkerDataRef = databaseRef(database, HAWKERS_FOLDER_NAME);

  useEffect(() => {
    const hawker = [];
    onChildAdded(hawkerDataRef, (data) => {
      hawker.push({ key: data.key, val: data.val() });
      setHawkerData([...hawker]);
    });
  }, []);

  // console.log(hawkerData);

  return (
    <div className="App">
      <UserContext.Provider value={userDetails}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/profile"
              element={<UserProfile clearUserDetails={clearUserDetails} />}
            />
            <Route path="/dish" element={<Dish dishData={dishData} />} />
            <Route
              path="/stall"
              element={<Stall hawkerData={hawkerData} dishData={dishData} />}
            />
            <Route path="/order" element={<Order dishData={dishData} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/createDish" element={<CreateDish />} />
            <Route path="/createStall" element={<CreateStall />} />
            <Route path="*" element={<Landing />} />
            <Route path="/editStall" element={<EditStall />} />
            <Route path="/editDish" element={<EditDish />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
