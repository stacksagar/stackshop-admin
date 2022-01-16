import React, {useState} from "react";
import Button from "../utils/Button";

const DeletePopup = ({setShowPopup, deleteCategory}) => {
  const [sure, setSure] = useState(false);
  return (
    <div className="fixed flex justify-center items-center inset-0 m-auto">
      <div
        onClick={() => setShowPopup(false)}
        className="bg-black bg-opacity-25 fixed inset-0 z-40"
      ></div>
      <div className="bg-red-100 text-red-500 p-5 fixed z-50">
        <b>Important:</b>
        <p>every children category will delete!</p>
        <p className="flex items-center space-x-1">
          <span>please sure again</span>
          <input type="checkbox" onClick={(e) => setSure(e.target.checked)} />
        </p>
        <div className="flex justify-between mt-5">
          <Button onClick={() => setShowPopup(false)} text="Cencel" />
          <Button
            onClick={deleteCategory}
            disabled={!sure}
            text="Delete"
            bg={`bg-red-500 ${!sure && " opacity-25 cursor-not-allowed"} `}
          />
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
