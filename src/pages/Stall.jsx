// import React from "react";
// import { Header, NavBar } from "../components";
// import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";

// const Stall = (props) => {
//   const hawkerData = props.hawkerData;
//   console.log(hawkerData);

//   // Filter Function to be added here.
//   const hawkerSelected = hawkerData[0];

//   // Store Front Photo
//   const storeFrontPhoto = (
//     <img
//       src={hawkerSelected.val.storeFrontURL}
//       className="p-4 rounded-3xl drop-shadow-xl"
//     />
//   );

//   // Other Store Photos
//   const otherStorePhotos = hawkerSelected.val.storeFrontURL.map((photoURL) => (
//     <img src={photoURL} className="w-1/3 m-2 rounded-lg" />
//   ));

//   return (
//     <div>
//       <div className="flex justify-around flex-wrap w-screen p-4">
//         <Header />
//         <NavBar />
//       </div>
//       <div className="flex justify-evenly flex-wrap w-screen">
//         <div className="text-left">
//           <p className="text-orange text-xl font-semibold drop-shadow-lg">
//             {hawkerSelected.val.stallname}
//           </p>
//         </div>
//         <div className="flex flex-wrap justify-start space-x-2 mt-0.5 text-purple">
//           <div className="text-3xl font-semibold">
//             <BsHandThumbsUp />
//             <div className="text-xxs">Likes</div>
//           </div>
//           <div>100</div>
//           <div className="text-3xl font-semibold">
//             <BsChatLeftText />
//             <div className="text-xxs">Reviews</div>
//           </div>
//           <div>20</div>
//         </div>
//         {storeFrontPhoto}
//         <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
//           {otherStorePhotos}
//         </div>
//         <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
//           <p className="text-xl font-semibold drop-shadow-lg">Description</p>
//           <p className="text-lg font-semibold pt-4">Story</p>
//           <p className="text-xxs lg:text-sm pt-4">{dishSelected.val.story}</p>
//           <p className="text-lg font-semibold pt-4">Contains</p>
//           <p className="text-green text-sm lg:text-sm pt-4">
//             {dishIngredients}
//           </p>
//           <p className="text-lg font-semibold pt-4">Attributes</p>
//           <p className="text-green text-sm lg:text-sm pt-4">{dishAttributes}</p>
//           <p className="text-lg font-semibold mb-3 pt-4">
//             Wanna know more about the stall?
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stall;
