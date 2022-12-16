import React, { useContext } from "react";
import {
  Header,
  NavBar,
  StallCarousel,
  DishCards,
  ContactForm,
} from "../components";
import { UserContext } from "../App";
import { HawkerContext } from "../contexts/HawkerContext";

const Landing = () => {
  const userDetails = useContext(UserContext);

  // console.log(userDetails);
  // Data Structure
  // contactEmail, firstName, karmaPoints, lastName, reviewsDone, userType, username

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <p className="text-orange text-xl font-semibold drop-shadow-lg text-left ml-4 mb-2 lg:ml-56">
          {userDetails ? `Welcome back ${userDetails.firstName}!` : null}
        </p>
      </div>
      <div className="2xl:container 2xl:mx-auto 2xl:px-0">
        <StallCarousel />
      </div>
      <div className="flex justify-evenly flex-wrap w-screen mt-5">
        <p className="text-orange text-xl font-semibold drop-shadow-lg text-left">
          Community Reviews
        </p>
      </div>
      <div className="flex justify-around flex-wrap w-screen p-1">
        <DishCards />
      </div>
      <div className="bg-orange">
        <div className="p-5" id="feedback">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Landing;
