import React from "react";
import FirstLetterUC from "../../utilities/FirstLetterUC";
const Input = ({type, id, optional, notLabel, ...props}) => {
  return (
    <div className="flex flex-col">
      {notLabel ? (
        <></>
      ) : (
        <label htmlFor={id}>
          <span className="text-sm">{FirstLetterUC(id)}</span>
          <span className="text-xs"> {optional ? "(optional)" : "*"} </span>
        </label>
      )}
      <input
        style={{padding: "5px 10px"}}
        {...props}
        type={type || "text"}
        name={id}
        id={id}
        className="focus:ring rounded-sm outline-none"
      />
    </div>
  );
};

export default Input;
