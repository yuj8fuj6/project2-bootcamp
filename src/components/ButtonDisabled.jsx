import React from "react";

const ButtonDisabled = (props) => {
  return (
    <button
      className="bg-purple text-white px-4 py-1 rounded-full lg:text-2xl disabled:bg-neutral-200"
      disabled={!props.user}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonDisabled;
