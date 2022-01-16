import React from "react";
import {Link, useLocation} from "react-router-dom";
const Button = ({path, children}) => {
  const {pathname} = useLocation();
  return (
    <button
      className={` ${
        pathname.toLowerCase() === path.toLowerCase() ? "bg-gray-500 " : ""
      } px-3 py-2 mb-2 w-full text-sm text-white rounded-l focus:ring hover:bg-gray-600 text-left`}
    >
      {children}
    </button>
  );
};
const Layout = ({px, children}) => {
  return (
    <div className="w-full h-minus_header flex justify-between">
      <div className="w-44 py-2 pl-2 bg-gray-800">
        <Link to="/">
          <Button path="/">Dashboard</Button>
        </Link>
        <Link to="/categories">
          <Button path="/categories">Categories</Button>
        </Link>
        <Link to="/products">
          <Button path="/products">Products</Button>
        </Link>
        <Link to="/orders">
          <Button path="/orders">Order</Button>
        </Link>
      </div>

      <div
        className={`w-full h-minus_header overflow-y-scroll bg-gray-600 ${
          px && "px-9"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
