import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAsTD59WCIIkcB_0pAdCqfSxrgpe5bmb6Q",
//   authDomain: "yumee-a614b.firebaseapp.com",
//   databaseURL: "https://yumee-a614b-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "yumee-a614b",
//   storageBucket: "yumee-a614b.appspot.com",
//   messagingSenderId: "362180775951",
//   appId: "1:362180775951:web:59f04c2d76b910c2bad37a",
// };

const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
