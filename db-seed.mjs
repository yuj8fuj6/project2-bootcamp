import {
  ref as databaseRef,
  set,
  push,
  getDatabase,
  get,
  child,
  update,
} from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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
    username: "bubblynuts",
    password: "password",
    firstName: "Yi Min",
    lastName: "How",
    userType: "hawker",
    contactEmail: "email2@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "uncertaincatfish",
    password: "password",
    firstName: "Yong Rui",
    lastName: "Poon",
    userType: "user",
    contactEmail: "email3@email.com",
    karmaPoints: 66,
    reviewsDone: 79,
  },
  {
    username: "ashamedcashews",
    password: "password",
    firstName: "Jia De",
    lastName: "Yeo",
    userType: "hawker",
    contactEmail: "email4@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "delirioussamphire",
    password: "password",
    firstName: "Wen Ming",
    lastName: "Law",
    userType: "user",
    contactEmail: "email5@email.com",
    karmaPoints: 24,
    reviewsDone: 87,
  },
  {
    username: "resignedtacos",
    password: "password",
    firstName: "Xin Ling",
    lastName: "Tin",
    userType: "hawker",
    contactEmail: "email6@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "mildalfalfa",
    password: "password",
    firstName: "Jun Ming",
    lastName: "Goh",
    userType: "user",
    contactEmail: "email7@email.com",
    karmaPoints: 10,
    reviewsDone: 34,
  },
  {
    username: "needfulflapjack",
    password: "password",
    firstName: "Min Hui",
    lastName: "Shen",
    userType: "hawker",
    contactEmail: "email8@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "selfishdough",
    password: "password",
    firstName: "Raihan Nazir",
    lastName: "Bin Mohammad Syaril",
    userType: "user",
    contactEmail: "email9@email.com",
    karmaPoints: 78,
    reviewsDone: 61,
  },
  {
    username: "enragedsausages",
    password: "password",
    firstName: "Ridwan Zaidi",
    lastName: "Bin Muhamad Noor",
    userType: "hawker",
    contactEmail: "email10@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "interestshortcake",
    password: "password",
    firstName: "Anya Shazri",
    lastName: "Binte Noh Yacob",
    userType: "user",
    contactEmail: "email11@email.com",
    karmaPoints: 14,
    reviewsDone: 54,
  },
  {
    username: "crushedcauliflower",
    password: "password",
    firstName: "Hema Kumari",
    lastName: "d/o M. Prabu",
    userType: "hawker",
    contactEmail: "email12@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "loyalblueberries",
    password: "password",
    firstName: "Ashvin Nair",
    lastName: "s/o A. Sathasivam",
    userType: "user",
    contactEmail: "email51@email.com",
    karmaPoints: 4,
    reviewsDone: 74,
  },
  {
    username: "homesickrice",
    password: "password",
    firstName: "Santhi Sathyamoorthi",
    lastName: "d/o J. Muthu",
    userType: "hawker",
    contactEmail: "email13@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "distractedtapioca",
    password: "password",
    firstName: "Santhil Kumar",
    lastName: "s/o A. Mohan",
    userType: "user",
    contactEmail: "email14@email.com",
    karmaPoints: 68,
    reviewsDone: 43,
  },
  {
    username: "lazypolenta",
    password: "password",
    firstName: "Eliza Sobia",
    lastName: "Binte Hairul Anuar",
    userType: "hawker",
    contactEmail: "email15@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "outragedbattenburg",
    password: "password",
    firstName: "Jun Kai",
    lastName: "Hong",
    userType: "user",
    contactEmail: "email16@email.com",
    karmaPoints: 47,
    reviewsDone: 17,
  },
  {
    username: "terrifieddoughnut",
    password: "password",
    firstName: "De Kang",
    lastName: "Lam",
    userType: "hawker",
    contactEmail: "email17@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "vengefulromaine",
    password: "password",
    firstName: "Kai Feng",
    lastName: "Su",
    userType: "user",
    contactEmail: "email18@email.com",
    karmaPoints: 97,
    reviewsDone: 8,
  },
  {
    username: "perturbedcrab",
    password: "password",
    firstName: "jarrel",
    lastName: "toodle",
    userType: "hawker",
    contactEmail: "email19@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
  {
    username: "mourningpinto",
    password: "password",
    firstName: "blockson",
    lastName: "overs",
    userType: "user",
    contactEmail: "email20@email.com",
    karmaPoints: 59,
    reviewsDone: 45,
  },
  {
    username: "acceptingcupcake",
    password: "password",
    firstName: "hortense",
    lastName: "reuben",
    userType: "hawker",
    contactEmail: "email21@email.com",
    karmaPoints: null,
    reviewsDone: null,
  },
];

const USER_PROFILES_DATABASE = "users/";
const USERKEYS_DATABASE = "userkeys/";

const userSeeding = function () {
  let i = 0;
  const interval = setInterval(async () => {
    const user = userSampleData[i];
    const {
      username,
      password,
      firstName,
      lastName,
      userType,
      contactEmail,
      karmaPoints,
      reviewsDone,
    } = user;
    await createUserWithEmailAndPassword(auth, contactEmail, password)
      .then(async (response) => {
        console.log(`created user in authentication`);
        updateProfile(auth.currentUser, { displayName: username });
        const uid = response.user.uid;
        const userRef = {
          username,
          firstName,
          lastName,
          userType,
          contactEmail,
          karmaPoints,
          reviewsDone,
        };
        const usersRef = databaseRef(database, USER_PROFILES_DATABASE + uid);
        // const usersListRef = push(usersRef);
        // const userKey = usersListRef.key;

        const userKeysRef = databaseRef(
          database,
          USERKEYS_DATABASE + userRef.contactEmail.replace(".", ","),
        );
        // const userKeysListRef = push(userKeysRef);

        await set(usersRef, userRef);

        await set(userKeysRef, uid);
        console.log(`added user to realtime database`, userRef.contactEmail);
      })
      .catch((error) => console.log(error));
    i += 1;
    if (i === userSampleData.length) {
      clearInterval(interval);
      console.log("all user data added, ctrl+c to exit");
    }
  }, 2000);
};

//hawker sample data
const stallsSampleData = [
  {
    userEmail: "email15@email.com",
    stallName: "Rolina Traditional Hainanese Curry Puffs",
    foodCenterName: "Tanjong Pagar Plaza Market and Food Centre,",
    stallAddress:
      "6 Tanjong Pagar Plaza Market and Food Centre, #02-15, Singapore 081006",
    openingHours: "06:30am to 02:00pm",
    openingDays: "Wed-Mon",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    stallMenu: [1],
    stallFrontPhoto: "rolina-curry-puff-storefront.jpg",
    startingYear: 2019,
    ownerName: "Eliza Sobia Binte Hairul Anuar",
  },
  {
    userEmail: "email4@email.com",
    stallName: "Ding Gua Gua Fried Rice",
    foodCenterName: "null",
    stallAddress: "Block 69, Bedok South Avenue 3, #01-498, Singapore 460069",
    openingHours: "10:30am to 08:30pm",
    openingDays: "Daily",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus non. Lacinia at quis risus sed vulputate odio ut.",
    stallMenu: [2, 3],
    stallFrontPhoto: "ding-gua-gua-fried-rice-ambience.jpg",
    startingYear: 2020,
    ownerName: "Wen Ming Law",
  },
  {
    userEmail: "email10@email.com",
    stallName: "Cendol Geylang Serai",
    foodCenterName: "Geylang Serai Market and Food Centre",
    stallAddress: "1 Geylang Serai, #02-107, Singapore 402001",
    openingHours: "11:00am to 10:00pm",
    openingDays: "Daily",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stallMenu: [4],
    stallFrontPhoto: "cendol-geylang-serai-storefront.jpg",
    startingYear: 2015,
    ownerName: "Ridwan Zaidi Bin Muhamad Noor",
  },
  {
    userEmail: "email2@email.com",
    stallName: "Minced Pork Bros",
    foodCenterName: "Old Airport Road Food Centre",
    stallAddress: "51 Old Airport Road, #01-113, Singapore 390051",
    openingHours: "09:00am to 05:30pm",
    openingDays: "Wed-Mon",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.",
    stallMenu: [5, 6],
    stallFrontPhoto: "minced-pork-bros-storefront.jpg",
    startingYear: 2007,
    ownerName: "Yi Min How",
  },
  {
    userEmail: "email6@email.com",
    stallName: "Beach Road Prawn Noodle House",
    foodCenterName: "null",
    stallAddress: "370/372 East Coast Road, Singapore 428981",
    openingHours: "07:00am to 04:00pm",
    openingDays: "Wed-Mon",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.",
    stallMenu: [11, 12],
    stallFrontPhoto: "beach-road-prawn-noodle-house-storefront.jpg",
    startingYear: 2001,
    ownerName: "Xin Ling Tin",
  },
  {
    userEmail: "email8@email.com",
    stallName: "First Street Teochew Fish Soup",
    foodCenterName: "null",
    stallAddress: "1014 Upper Serangoon Road, Singapore 534752",
    openingHours: "08:00am to 03:30pm",
    openingDays: "Daily",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget velit aliquet sagittis id.",
    stallMenu: [7],
    stallFrontPhoto: "first-street-teochew-fish-soup-storefront.jpg",
    startingYear: 2014,
    ownerName: "Min Hui Shen",
  },
  {
    userEmail: "email17@email.com",
    stallName: "Ah Gong Minced Pork Noodles",
    foodCenterName: "Maxwell Food Centre",
    stallAddress: "1 Kadayanallur Street, #01-02, Singapore 069184",
    openingHours: "10:30am to 03:00pm",
    openingDays: "Mon-Sat",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stallMenu: [8],
    stallFrontPhoto:
      "ah-gong-minced-pork-noodle-storefront-with-owner-elin.jpg",
    startingYear: 2018,
    ownerName: "De Kang Lam",
  },
  {
    userEmail: "email12@email.com",
    stallName: "Midas",
    foodCenterName: "Hong Lim Market & Food Centre",
    stallAddress: "531A Upper Cross Street, #02-07, Singapore 051531",
    openingHours: "10:00am to 04:00pm",
    openingDays: "Tue-Fri",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus sed viverra tellus in hac. Libero id faucibus nisl tincidunt eget nullam non nisi est.",
    stallMenu: [9, 10],
    stallFrontPhoto: "midas-curry-storefront.jpg",
    startingYear: 2019,
    ownerName: "Hema Kumari d/o M. Prabu",
  },
  {
    userEmail: "email21@email.com",
    stallName: "Balestier Road Hoover Rojak",
    foodCenterName: "Whampoa Makan Place",
    stallAddress: "90 Whampoa Drive, #01-06, Singapore 320090",
    openingHours: "10:00am to 04:00pm",
    openingDays: "Wed-Sun",
    stallStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis lectus magna fringilla urna porttitor.",
    stallMenu: [],
    stallFrontPhoto: "Balestier-Road-Hoover-Rojak-storefront.jpg",
    startingYear: 2016,
    ownerName: "Reuben Hortense",
  },
];

//Dishes Sample Data
const dishes = [
  {
    dishName: "Curry Puff",
    stallName: "Rolina Traditional Hainanese Curry Puffs",
    ingredientList: ["Potatoes", "Flour", "Chicken", "Curry", "Egg"],
    attribute: ["Crunchy", "Spicy", "Salty", "Buttery"],
    photos: ["rolina-curry-puff.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Prawn Fried Rice",
    stallName: "Ding Gua Gua Fried Rice",
    ingredientList: ["Rice", "Eggs", "Scallions", "Prawns"],
    attribute: ["Salty", "Sweet", "Wok Hei"],
    photos: [
      "dgg-egg-fried-rice-with-shrimp.jpg",
      "ding-gua-gua-chilli-sauce.jpg",
      "ding-gua-gua-flatlay.jpg",
    ],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Egg Fried Rice",
    stallName: "Ding Gua Gua Fried Rice",
    ingredientList: ["Rice", "Eggs", "Scallions"],
    attribute: ["Salty", "Eggy", "Wok Hei"],
    photos: ["egg-fried-rice-close-up.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Cendol",
    stallName: "Cendol Geylang Serai",
    ingredientList: ["Gula Melaka", "Flour", "Milk"],
    attribute: ["Sweet"],
    photos: ["cendol-geylang-serai-scooping.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Seafood Minced Meat Noodles",
    stallName: "Minced Pork Bros",
    ingredientList: [
      "Egg Noodles",
      "Minced Meat",
      "Prawn",
      "Abalone",
      "Vinegar",
    ],
    attribute: ["Salty", "Peppery", "Vinegary"],
    photos: ["minced-pork-bros-seafood.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Modern Pork Noodles",
    stallName: "Minced Pork Bros",
    ingredientList: ["Egg Noodles", "Minced Meat", "Pork Slices", "Vinegar"],
    attribute: ["Salty", "Peppery", "Vinegary"],
    photos: ["minced-pork-bros-teochew-modern-pork-noodles.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Fish Soup",
    stallName: "First Street Teochew Fish Soup",
    ingredientList: ["Fish", "Ginger", "Scallions", "Prawns"],
    attribute: ["Gingery", "Refreshing"],
    photos: ["first-street-teochew-fish-soup-flatlay.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Minced Meat Noodles",
    stallName: "Ah Gong Minced Pork Noodles",
    ingredientList: ["Pork", "Beancurd Skin", "Noodles", "Lard"],
    attribute: ["Salty", " Vinegary", "Umami"],
    photos: ["ah-gong-minced-pork-noodle-signature-bak-chor-mee-dry.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Curry Set",
    stallName: "Midas",
    ingredientList: ["Curry paste", "Curry Leaf", "Potatoes", "Chicken"],
    attribute: ["Spicy", "Sweet"],
    photos: ["midas-curry-only.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Prata",
    stallName: "Midas",
    ingredientList: ["Flour"],
    attribute: ["Crispy"],
    photos: ["midas-curry-prata.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Prawn Noodles",
    stallName: "Beach Road Prawn Noodle House",
    ingredientList: ["Yellow Noodles", "Prawns", "Scallions"],
    attribute: ["Sweet", "Light", "Fresh"],
    photos: ["beach-road-prawn-noodle-house-prawn-with-pig-tail-mee.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishName: "Ngoh Hiang Platter",
    stallName: "Beach Road Prawn Noodle House",
    ingredientList: [
      "Beancurd Skin",
      "Fishcake",
      "Pork Sausage",
      "Ngoh Hiang",
      "Prawn Crackers",
    ],
    attribute: ["Crunchy", "Salty"],
    photos: ["beach-road-prawn-noodle-house-ngoh-hiang-platter.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

//Hawker and Dishes Seeding
//Dish photos have been uploaded to Storage prior.
//Create reference to the dish photo, retrieve the url and update it to the dish post

//reference folders names here, rename the variables if your storage file names differ
const HAWKER_PHOTOS_FOLDER = "hawkerphotos";
const HAWKER_DATABASE = "hawkers/";
const DISH_PHOTOS_FOLDER = "dishphotos";
const DISH_DATABASE = "dishes";
const HAWKER_DISH_RELATION_DATABASE = "hawker-dishes/";
const USER_HAWKERS_DATABASE = "user-hawkers/";

const hawkerAndDishSeeding = async function () {
  const hawkerDishKeys = {};
  const userHawkerKeys = {};

  for (let i = 0; i < stallsSampleData.length; i++) {
    const stall = stallsSampleData[i];
    const stallEmailRef = stall.userEmail.replace(".", ",");
    let userID = "";

    //get userKey from userkeys database in realtime database
    const dbRef = databaseRef(database);
    await get(child(dbRef, `${USERKEYS_DATABASE}/${stallEmailRef}`)).then(
      (snapshot) => {
        userID = snapshot.val();
      },
    );

    userHawkerKeys[userID] = {};

    await getDownloadURL(
      storageRef(storage, `${HAWKER_PHOTOS_FOLDER}/${stall.stallFrontPhoto}`),
    )
      .then((url) => {
        stall.stallFrontPhotoURL = url;
        const newStallObj = {
          stallName: stall.stallName,
          foodCenterName: stall.foodCenterName,
          openingDays: stall.openingDays,
          openingHours: stall.openingHours,
          stallAddress: stall.stallAddress,
          stallFrontPhotoURL: stall.stallFrontPhotoURL,
          stallStory: stall.stallStory,
          userKey: userID,
          userEmail: stall.userEmail,
          ownerName: stall.ownerName,
          startingYear: stall.startingYear,
        };
        const stallsListRef = databaseRef(database, HAWKER_DATABASE);
        const newStallsRef = push(stallsListRef);
        const newStallsRefKey = newStallsRef.key;
        hawkerDishKeys[newStallsRefKey] = {};
        set(newStallsRef, { ...newStallObj });

        userHawkerKeys[userID][newStallsRefKey] = stall.stallName;

        for (let m = 0; m < dishes.length; m++) {
          if (stallsSampleData[i].stallName === dishes[m].stallName) {
            dishes[m].userKey = userID;
            dishes[m].hawkerKey = newStallsRefKey;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const userStallsListRef = databaseRef(database, USER_HAWKERS_DATABASE);

  set(userStallsListRef, userHawkerKeys);

  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];

    for (let m = 0; m < dish.photos.length; m++) {
      let dishPhoto = dish.photos[m];
      await getDownloadURL(
        storageRef(storage, `${DISH_PHOTOS_FOLDER}/${dishPhoto}`),
      )
        .then((url) => {
          dish.photoURLs.push(url);
        })
        .catch((error) => {
          return console.log(error);
        });
    }

    const newDish = {
      dishName: dish.dishName,
      stallName: dish.stallName,
      ingredientList: dish.ingredientList,
      attribute: dish.attribute,
      photoURLs: dish.photoURLs,
      story: dish.story,
      hawkerKey: dish.hawkerKey,
      userKey: dish.userKey,
    };
    const dishListRef = databaseRef(database, DISH_DATABASE);
    const newDishRef = push(dishListRef);
    const newDishKey = newDishRef.key;
    set(newDishRef, { ...newDish });

    hawkerDishKeys[dish.hawkerKey][newDishKey] = dish.dishName;
  }

  const hawkerDishKeysRef = databaseRef(
    database,
    HAWKER_DISH_RELATION_DATABASE,
  );
  set(hawkerDishKeysRef, hawkerDishKeys);
  console.log("end of uploads, ctrl+c to exit");
};

//function calls
//please run userSeeding() first, then run hawkerAndDishSeeding(), to do so comment out the function you are not running before executing this file.
// userSeeding();
hawkerAndDishSeeding();
