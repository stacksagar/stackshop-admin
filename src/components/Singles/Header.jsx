import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout_start} from "../../redux/actions/auth.actions";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logout = () => {
    logout_start(dispatch);
  };

  return (
    <header className="w-full flex h-header bg-gray-700 text-white items-center justify-around">
      <Link to="/">
        <div>LOGO</div>
      </Link>
      <nav className="flex space-x-5">
        {auth?.authenticated ? (
          <button onClick={logout} className="">
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/signin">
              <button onClick={logout} className="">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button onClick={logout} className="">
                Sign Up  
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
