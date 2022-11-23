import { ref as databaseRef, set, push } from "firebase/database";
import { ref as storageRef } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//please enter firebaseConfig here
const firebaseConfig = {};

// // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service and export the reference for other modules
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

//Sample User Profiles
const userSampleData = [
  {
    username: "sadmin",
    password: "password",
    firstname: "super",
    lastname: "admin",
    usertype: "all",
    contactemail: "email1@email.com",
    karmapoints: "1000",
    reviewsdone: "10002",
  },
  {
    username: "bubblynuts",
    password: "password",
    firstname: "Yi Min",
    lastname: "How",
    usertype: "hawker",
    contactemail: "email2@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "uncertaincatfish",
    password: "password",
    firstname: "Yong Rui",
    lastname: "Poon",
    usertype: "user",
    contactemail: "email3@email.com",
    karmapoints: "66",
    reviewsdone: "79",
  },
  {
    username: "ashamedcashews",
    password: "password",
    firstname: "Jia De",
    lastname: "Yeo",
    usertype: "hawker",
    contactemail: "email4@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "delirioussamphire",
    password: "password",
    firstname: "Wen Ming",
    lastname: "Law",
    usertype: "user",
    contactemail: "email5@email.com",
    karmapoints: "24",
    reviewsdone: "87",
  },
  {
    username: "resignedtacos",
    password: "password",
    firstname: "Xin Ling",
    lastname: "Tin",
    usertype: "hawker",
    contactemail: "email6@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "mildalfalfa",
    password: "password",
    firstname: "Jun Ming",
    lastname: "Goh",
    usertype: "user",
    contactemail: "email7@email.com",
    karmapoints: "10",
    reviewsdone: "34",
  },
  {
    username: "needfulflapjack",
    password: "password",
    firstname: "Min Hui",
    lastname: "Shen",
    usertype: "hawker",
    contactemail: "email8@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "selfishdough",
    password: "password",
    firstname: "Raihan Nazir",
    lastname: "Bin Mohammad Syaril",
    usertype: "user",
    contactemail: "email9@email.com",
    karmapoints: "78",
    reviewsdone: "61",
  },
  {
    username: "enragedsausages",
    password: "password",
    firstname: "Ridwan Zaidi",
    lastname: "Bin Muhamad Noor",
    usertype: "hawker",
    contactemail: "email10@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "interestshortcake",
    password: "password",
    firstname: "Anya Shazri",
    lastname: "Binte Noh Yacob",
    usertype: "user",
    contactemail: "email11@email.com",
    karmapoints: "14",
    reviewsdone: "54",
  },
  {
    username: "crushedcauliflower",
    password: "password",
    firstname: "Hema Kumari",
    lastname: "d/o M. Prabu",
    usertype: "hawker",
    contactemail: "email12@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "loyalblueberries",
    password: "password",
    firstname: "Ashvin Nair",
    lastname: "s/o A. Sathasivam",
    usertype: "user",
    contactemail: "email51@email.com",
    karmapoints: "4",
    reviewsdone: "74",
  },
  {
    username: "homesickrice",
    password: "password",
    firstname: "Santhi Sathyamoorthi",
    lastname: "d/o J. Muthu",
    usertype: "hawker",
    contactemail: "email13@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "distractedtapioca",
    password: "password",
    firstname: "Santhil Kumar",
    lastname: "s/o A. Mohan",
    usertype: "user",
    contactemail: "email14@email.com",
    karmapoints: "68",
    reviewsdone: "43",
  },
  {
    username: "lazypolenta",
    password: "password",
    firstname: "Eliza Sobia",
    lastname: "Binte Hairul Anuar",
    usertype: "hawker",
    contactemail: "email15@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "outragedbattenburg",
    password: "password",
    firstname: "Jun Kai",
    lastname: "Hong",
    usertype: "user",
    contactemail: "email16@email.com",
    karmapoints: "47",
    reviewsdone: "17",
  },
  {
    username: "terrifieddoughnut",
    password: "password",
    firstname: "De Kang",
    lastname: "Lam",
    usertype: "hawker",
    contactemail: "email17@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "vengefulromaine",
    password: "password",
    firstname: "Kai Feng",
    lastname: "Su",
    usertype: "user",
    contactemail: "email18@email.com",
    karmapoints: "97",
    reviewsdone: "8",
  },
  {
    username: "perturbedcrab",
    password: "password",
    firstname: "jarrel",
    lastname: "toodle",
    usertype: "hawker",
    contactemail: "email19@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
  {
    username: "mourningpinto",
    password: "password",
    firstname: "blockson",
    lastname: "overs",
    usertype: "user",
    contactemail: "email20@email.com",
    karmapoints: "59",
    reviewsdone: "45",
  },
  {
    username: "acceptingcupcake",
    password: "password",
    firstname: "hortense",
    lastname: "reuben",
    usertype: "hawker",
    contactemail: "email21@email.com",
    karmapoints: "null",
    reviewsdone: "null",
  },
];

const USER_PROFILES_DATABASE = "users";

const userSeeding = function () {
  let i = 0;
  const interval = setInterval(async () => {
    const user = userSampleData[i];
    const {
      username,
      password,
      firstname,
      lastname,
      usertype,
      contactemail,
      karmapoints,
      reviewsdone,
    } = user;
    await createUserWithEmailAndPassword(auth, contactemail, password)
      .then(async (response) => {
        console.log(`created user in authentication`);
        const uid = response.user.uid;
        const userRef = {
          username,
          firstname,
          lastname,
          usertype,
          contactemail,
          karmapoints,
          reviewsdone,
        };
        const usersRef = databaseRef(database, USER_PROFILES_DATABASE);
        const usersListRef = push(usersRef);
        await set(usersListRef, userRef);
        console.log(`added user to realtime database`, userRef.contactemail);
      })
      .catch((error) => console.log(error));
    i += 1;
    if (i === userSampleData.length) clearInterval(interval);
  }, 2000);
};

// userSeeding();

//Dish Posts
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

const DISH_PHOTOS_STORAGE = "dish";
const dishPhotoRef = storageRef(storage, DISH_PHOTOS_STORAGE);
