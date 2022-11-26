import { ref as databaseRef, set, push } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
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

//hawker sample data
const stallsSampleData = [
  {
    useremail: "email15@email.com",
    stallname: "Rolina Traditional Hainanese Curry Puffs",
    foodcentername: "Tanjong Pagar Plaza Market and Food Centre,",
    stalllocation:
      "6 Tanjong Pagar Plaza Market and Food Centre, #02-15, Singapore 081006",
    openinghours: "06:30am to 02:00pm",
    openingdays: "Wed-Mon",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    stallmenu: [1],
    storefrontPhoto: "rolina-curry-puff-storefront.jpg",
  },
  {
    useremail: "email4@email.com",
    stallname: "Ding Gua Gua Fried Rice",
    foodcentername: "null",
    stalllocation: "Block 69, Bedok South Avenue 3, #01-498, Singapore 460069",
    openinghours: "10:30am to 08:30pm",
    openingdays: "Daily",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus non. Lacinia at quis risus sed vulputate odio ut.",
    stallmenu: [2, 3],
    storefrontPhoto: "ding-gua-gua-fried-rice-ambience.jpg",
  },
  {
    useremail: "email10@email.com",
    stallname: "Cendol Geylang Serai",
    foodcentername: "Geylang Serai Market and Food Centre",
    stalllocation: "1 Geylang Serai, #02-107, Singapore 402001",
    openinghours: "11:00am to 10:00pm",
    openingdays: "Daily",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stallmenu: [4],
    storefrontPhoto: "cendol-geylang-serai-storefront.jpg",
  },
  {
    useremail: "email2@email.com",
    stallname: "Minced Pork Bros",
    foodcentername: "Old Airport Road Food Centre",
    stalllocation: "51 Old Airport Road, #01-113, Singapore 390051",
    openinghours: "09:00am to 05:30pm",
    openingdays: "Wed-Mon",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.",
    stallmenu: [5, 6],
    storefrontPhoto: "minced-pork-bros-storefront.jpg",
  },
  {
    useremail: "email6@email.com",
    stallname: "Beach Road Prawn Noodle House",
    foodcentername: "null",
    stalllocation: "370/372 East Coast Road, Singapore 428981",
    openinghours: "07:00am to 04:00pm",
    openingdays: "Wed-Mon",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.",
    stallmenu: [11, 12],
    storefrontPhoto: "beach-road-prawn-noodle-house-storefront.jpg",
  },
  {
    useremail: "email8@email.com",
    stallname: "First Street Teochew Fish Soup",
    foodcentername: "null",
    stalllocation: "1014 Upper Serangoon Road, Singapore 534752",
    openinghours: "08:00am to 03:30pm",
    openingdays: "Daily",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget velit aliquet sagittis id.",
    stallmenu: [7],
    storefrontPhoto: "first-street-teochew-fish-soup-storefront.jpg",
  },
  {
    useremail: "email17@email.com",
    stallname: "Ah Gong Minced Pork Noodles",
    foodcentername: "Maxwell Food Centre",
    stalllocation: "1 Kadayanallur Street, #01-02, Singapore 069184",
    openinghours: "10:30am to 03:00pm",
    openingdays: "Mon-Sat",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stallmenu: [8],
    storefrontPhoto:
      "ah-gong-minced-pork-noodle-storefront-with-owner-elin.jpg",
  },
  {
    useremail: "email12@email.com",
    stallname: "Midas",
    foodcentername: "Hong Lim Market & Food Centre",
    stalllocation: "531A Upper Cross Street, #02-07, Singapore 051531",
    openinghours: "10:00am to 04:00pm",
    openingdays: "Tue-Fri",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus sed viverra tellus in hac. Libero id faucibus nisl tincidunt eget nullam non nisi est.",
    stallmenu: [9, 10],
    storefrontPhoto: "midas-curry-storefront.jpg",
  },
  {
    useremail: "email21@email.com",
    stallname: "Balestier Road Hoover Rojak",
    foodcentername: "Whampoa Makan Place",
    stalllocation: "90 Whampoa Drive, #01-06, Singapore 320090",
    openinghours: "10:00am to 04:00pm",
    openingdays: "Wed-Sun",
    stallstory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis lectus magna fringilla urna porttitor.",
    stallmenu: [],
    storefrontPhoto: "Balestier-Road-Hoover-Rojak-storefront.jpg",
  },
];

//Dishes Sample Data
const dishes = [
  {
    dishID: 1,
    dishname: "Curry Puff",
    stalllname: "Rolina Traditional Hainanese Curry Puffs",
    ingredientlist: ["Potatoes", "Flour", "Chicken", "Curry", "Egg"],
    attribute: ["Crunchy", "Spicy", "Salty", "Buttery"],
    photos: ["rolina-curry-puff.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 2,
    dishname: "Prawn Fried Rice",
    stalllname: "Ding Gua Gua Fried Rice",
    ingredientlist: ["Rice", "Eggs", "Scallions", "Prawns"],
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
    dishID: 3,
    dishname: "Egg Fried Rice",
    stalllname: "Ding Gua Gua Fried Rice",
    ingredientlist: ["Rice", "Eggs", "Scallions"],
    attribute: ["Salty", "Eggy", "Wok Hei"],
    photos: ["egg-fried-rice-close-up.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 4,
    dishname: "Cendol",
    stalllname: "Cendol Geylang Serai",
    ingredientlist: ["Gula Melaka", "Flour", "Milk"],
    attribute: ["Sweet"],
    photos: ["cendol-geylang-serai-scooping.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 5,
    dishname: "Seafood Minced Meat Noodles",
    stalllname: "Minced Pork Bros",
    ingredientlist: [
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
    dishID: 6,
    dishname: "Modern Pork Noodles",
    stalllname: "Minced Pork Bros",
    ingredientlist: ["Egg Noodles", "Minced Meat", "Pork Slices", "Vinegar"],
    attribute: ["Salty", "Peppery", "Vinegary"],
    photos: ["minced-pork-bros-teochew-modern-pork-noodles.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 7,
    dishname: "Fish Soup",
    stalllname: "First Street Teochew Fish Soup",
    ingredientlist: ["Fish", "Ginger", "Scallions", "Prawns"],
    attribute: ["Gingery", "Refreshing"],
    photos: ["first-street-teochew-fish-soup-flatlay.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 8,
    dishname: "Minced Meat Noodles",
    stalllname: "Ah Gong Minced Pork Noodles",
    ingredientlist: ["Pork", "Beancurd Skin", "Noodles", "Lard"],
    attribute: ["Salty", " Vinegary", "Umami"],
    photos: ["ah-gong-minced-pork-noodle-signature-bak-chor-mee-dry.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 9,
    dishname: "Curry Set",
    stalllname: "Midas",
    ingredientlist: ["Curry paste", "Curry Leaf", "Potatoes", "Chicken"],
    attribute: ["Spicy", "Sweet"],
    photos: ["midas-curry-only.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 10,
    dishname: "Prata",
    stalllname: "Midas",
    ingredientlist: ["Flour"],
    attribute: ["Crispy"],
    photos: ["midas-curry-prata.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 11,
    dishname: "Prawn Noodles",
    stalllname: "Beach Road Prawn Noodle House",
    ingredientlist: ["Yellow Noodles", "Prawns", "Scallions"],
    attribute: ["Sweet", "Light", "Fresh"],
    photos: ["beach-road-prawn-noodle-house-prawn-with-pig-tail-mee.jpg"],
    photoURLs: [],
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dishID: 12,
    dishname: "Ngoh Hiang Platter",
    stalllname: "Beach Road Prawn Noodle House",
    ingredientlist: [
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
const HAWKER_DATABASE = "hawkers";
const DISH_PHOTOS_FOLDER = "dishphotos";
const DISH_DATABASE = "dishes";

const hawkerSeeding = function () {
  for (let i = 0; i < stallsSampleData.length; i++) {
    const stall = stallsSampleData[i];
    getDownloadURL(
      storageRef(storage, `${HAWKER_PHOTOS_FOLDER}/${stall.storefrontPhoto}`)
    )
      .then((url) => {
        stall.storefrontURL = url;
        console.log(stall);
        const stallsListRef = databaseRef(database, HAWKER_DATABASE);
        const newStallRef = push(stallsListRef);
        set(newStallRef, { ...stall });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const dishSeeding = async function () {
  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];
    for (let m = 0; m < dish.photos.length; m++) {
      let dishPhoto = dish.photos[m];
      await getDownloadURL(
        storageRef(storage, `${DISH_PHOTOS_FOLDER}/${dishPhoto}`)
      )
        .then((url) => {
          dish.photoURLs.push(url);
        })
        .catch((error) => {
          return console.log(error);
        });
    }

    const dishListRef = databaseRef(database, DISH_DATABASE);
    const newDishRef = push(dishListRef);
    set(newDishRef, { ...dish });
  }
};

//function calls
userSeeding();
hawkerSeeding();
dishSeeding();
