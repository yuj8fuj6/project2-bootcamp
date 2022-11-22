import { ref as databaseRef, set, push } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
/* const { database, storage, auth } = require("./src/firebase");
const { ref, set } = require("firebase/database");
const databaseRef = ref; */

//please enter firebaseConfig here//
const firebaseConfig = {};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service and export the reference for other modules
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

const userSampleData = [
  {
    username: "user1",
    password: "password",
    userType: "user",
    contactEmail: "email@email.com",
    karmaPoints: 10,
    reviewsDone: 1,
    id: 1,
  },
  {
    username: "user2",
    password: "password",
    userType: "user",
    contactEmail: "email2@email.com",
    karmaPoints: 1,
    reviewsDone: 1,
    id: 2,
  },
  {
    username: "user3",
    password: "password",
    userType: "user",
    contactEmail: "email3@email.com",
    karmaPoints: 0,
    reviewsDone: 0,
    id: 3,
  },
  {
    username: "hawker1",
    password: "password",
    userType: "hawker",
    contactEmail: "hawker@email.com",
    stallName: "hawker1 best stall",
    stallLocation: "Ubi Avenue 3",
    id: 4,
  },
  {
    username: "hawker2",
    password: "password",
    userType: "hawker",
    contactEmail: "hawker2@email.com",
    stallName: "hawker2 even better stall",
    stallLocation: "Ubi Avenue 4",
    id: 5,
  },
  {
    username: "hawker3",
    password: "password",
    userType: "hawker",
    contactEmail: "hawker3@email.com",
    stallName: "tasty dishes stall",
    stallLocation: "Ubi Avenue 5",
    id: 6,
  },
];

const USER_PROFILES_DATABASE = "users";
const userRef = databaseRef(database, USER_PROFILES_DATABASE);
/* const userListRef = push(userRef); */

set(userRef, userSampleData);

/* for (let i = 0; i < userSampleData.length; i++) {
  set(userListRef, userSampleData[i]);
} */

const dishes = [
  {
    dishID: 7,
    dishName: "prawn noodles",
    stall: {
      stallName: "hawker2 even better stall",
      stallLocation: "Ubi Avenue 4",
    },
    dishPhoto:
      "./project2-bootcamp/public/SampleDishPhotos/beach-road-prawn-noodle-house-ngoh-hiang-platter.jpg",
    ingredientList: "prawn, noodles, beansprouts",
    attribute: "sweet, salty, umami",
    price: "$5",
  },
  {
    dishID: 8,
    stall: {
      stallName: "tasty dishes stall",
      stallLocation: "Ubi Avenue 3",
    },
    dishName: "fried rice",
    dishPhoto:
      "./project2-bootcamp/public/SampleDishPhotos/beach-road-prawn-noodle-house-ngoh-hiang-platter.jpg",
    ingredientList: "prawn, noodles, beansprouts",
    attribute: "sweet, salty, umami",
    price: "$5",
  },
  {
    dishID: 9,
    stall: {
      stallName: "hawker1 best stall",
      stallLocation: "Ubi Avenue 3",
    },
    dishName: "fried rice",
    dishPhoto:
      "./project2-bootcamp/public/SampleDishPhotos/beach-road-prawn-noodle-house-ngoh-hiang-platter.jpg",
    ingredientList: "prawn, noodles, beansprouts",
    attribute: "sweet, salty, umami",
    price: "$5",
  },
];
