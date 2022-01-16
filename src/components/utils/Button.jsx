import React from "react";

const Button = ({loading, text, type, bg, ...props}) => {
  return (
    <button
      {...props}
      type={type || "button"}
      className={`${
        bg ? bg : "bg-blue-500"
      } text-white outline-none focus:ring p-2 rounded-sm relative`}
    >
      <span>{text}</span>
      {loading ? (
        <span
          className="border-2 block w-5 h-5 rounded-full absolute inset-y-0 right-5 my-auto animate-spin"
          style={{borderTopColor: "transparent"}}
        />
      ) : (
        <></>
      )}
    </button>
  );
};

export default Button;
