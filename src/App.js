import React, { useEffect, useState, useCallback, useContext } from "react";
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
import { auth } from "./firebase";
import {
  ref as databaseRef,
  getDatabase,
  query,
  onValue,
} from "firebase/database";
import Login from "./pages/Login";
import CreateDish from "./pages/CreateDish";
import { DishContextProvider } from "./contexts/DishContext";
import { HawkerContextProvider } from "./contexts/HawkerContext";
import EditStall from "./pages/EditStall";
import EditDish from "./pages/EditDish";
import { OrderContextProvider } from "./contexts/OrderContext";
import { ReviewContextProvider } from "./contexts/ReviewContext";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState("");
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

  console.log(userDetails);

  return (
    <div className="App">
      <UserContext.Provider value={userDetails}>
        <HawkerContextProvider>
          <DishContextProvider>
            <OrderContextProvider>
              <ReviewContextProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route
                      path="/profile"
                      element={
                        <UserProfile clearUserDetails={clearUserDetails} />
                      }
                    />
                    <Route path="/dish" element={<Dish />} />
                    <Route path="/stall" element={<Stall />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/search" element={<Search />} />
                    <Route
                      path="/createDish"
                      element={<CreateDish userUID={user.uid} />}
                    />
                    <Route
                      path="/createStall"
                      element={<CreateStall userUID={user.uid} />}
                    />
                    <Route path="*" element={<Landing />} />
                    <Route path="/editStall" element={<EditStall />} />
                    <Route path="/editDish" element={<EditDish />} />
                  </Routes>
                </BrowserRouter>
              </ReviewContextProvider>
            </OrderContextProvider>
          </DishContextProvider>
        </HawkerContextProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
