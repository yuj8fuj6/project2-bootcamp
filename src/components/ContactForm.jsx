import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";

// need styling
export default function ContactForm() {
  const [state, handleSubmit] = useForm("xgeqgpbg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className=" text-white text-xl font-bold flex flex-col justify-center py-2"
    >
      <p>Contact Us</p>
      <p className="text-sm mt-2">Contact us at abcde@gmail.com</p>
      <p className="text-sm mt-2">to find out more about our platform !</p>
      <label htmlFor="email" className="mb-3">Feedback Form</label>
      <input
        className="border-solid border-2 rounded text-sm text-orange pl-1"
        type="name"
        id="name"
        required
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
      />
      <ValidationError prefix="Name" field="name" errors={state.errors} />
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        className="border-solid border-2 rounded text-sm my-4 text-orange pl-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        className="border-solid border-2 rounded text-sm py-8 text-orange  pl-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <div className="flex justify-center mt-5">
        <button
          type="submit"
          disabled={state.submitting}
          className="flex justify-center text-purple border-purple border-solid border-2 text-lg bg-white rounded-xl px-5 drop-shadow-xl my-4 w-20"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
