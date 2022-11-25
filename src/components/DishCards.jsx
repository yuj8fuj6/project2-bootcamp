import React from "react";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { Link } from "react-router-dom";

const DishCards = () => {
  const posts = [
    {
      title: "Prawn Noodles",
      subtitle: "Prawn Village",
      location: "Golden Mile Food Centre",
      img: "/SampleDishPhotos/first-street-teochew-fish-soup-pomfret-fish-soup.jpg",
      content: "Tantalizingly delicious! Would visit again, ...",
    },
    {
      title: "Prawn Noodles",
      subtitle: "Prawn Village",
      location: "Golden Mile Food Centre",
      img: "/SampleDishPhotos/first-street-teochew-fish-soup-pomfret-fish-soup.jpg",
      content: "Tantalizingly delicious! Would visit again, ...",
    },
    {
      title: "Prawn Noodles",
      subtitle: "Prawn Village",
      location: "Golden Mile Food Centre",
      img: "/SampleDishPhotos/first-street-teochew-fish-soup-pomfret-fish-soup.jpg",
      content: "Tantalizingly delicious! Would visit again, ...",
    },
    {
      title: "Prawn Noodles",
      subtitle: "Prawn Village",
      location: "Golden Mile Food Centre",
      img: "/SampleDishPhotos/first-street-teochew-fish-soup-pomfret-fish-soup.jpg",
      content: "Tantalizingly delicious! Would visit again, ...",
    },
  ];
  return (
    <>
      <Link to="/dish">
        <div className="flex justify-evenly flex-wrap sm:flex-1 overflow-auto h-[32rem]">
          {posts.map((items, key) => (
            <div
              className="w-full rounded-lg shadow-md lg:max-w-sm m-3 hover:bg-orange/90 hover:opacity-75"
              key={key}
            >
              <img
                className="object-cover w-full h-72 p-2 rounded-2xl drop-shadow-xl"
                src={items.img}
                alt="dish-photo"
              />
              <div className="p-4 text-left">
                <h4 className="text-lg font-extrabold text-purple">
                  {items.title}
                </h4>
                <h5 className="text-sm font-extrabold text-purple">
                  {items.subtitle}
                </h5>
                <h4 className="text-lg font-medium text-purple">
                  {items.location}
                </h4>
                <p className="mb-2 leading-normal text-sm font-medium text-purple italic ">
                  {items.content}
                </p>
              </div>
              <div className="flex flex-wrap justify-start space-x-12 mx-5">
                <div className="text-3xl font-semibold text-purple">
                  <BsHandThumbsUp />
                  <div className="text-xxs">Total Likes</div>
                </div>
                <div className="text-3xl font-semibold text-purple">
                  <BsChatLeftText />
                  <div className="text-xxs">Total Reviews</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </>
  );
};

export default DishCards;
