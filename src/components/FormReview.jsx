import React, { useState } from "react";

const FormReview = (props) => {
  //Dish ID

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submission, setSubmission] = useState([]);
  const handleFeedback = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmission([...submission, feedback]);
    setFeedback({});
  };

  return (
    <div className="text-left text-white text-xl font-bold">
      <p>Contact Us</p>
      <p className="text-sm mt-2">Contact us at abcde@gmail.com</p>
      <p className="text-sm mt-2">to find out more about our platform</p>
      <p className="mt-5">Feedback Form</p>
      <form className="grid grid-cols-1 space-y-2">
        <input
          className="border-solid border-2 rounded text-sm"
          type="name"
          id="name"
          required
          placeholder="Name"
          value={feedback.name}
          onChange={handleFeedback}
          name="name"
        ></input>
        <input
          className="border-solid border-2 rounded text-sm"
          type="text"
          id="email"
          required
          placeholder="Email"
          value={feedback.email}
          onChange={handleFeedback}
          name="email"
        ></input>
        <input
          className="border-solid border-2 rounded text-sm py-8"
          type="text"
          id="comment"
          required
          placeholder="Fill"
          value={feedback.comment}
          onChange={handleFeedback}
          name="comment"
        ></input>
      </form>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleSubmit}
          className="flex justify-center text-purple border-purple border-solid border-2 text-lg bg-white rounded-xl px-5 drop-shadow-xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormReview;