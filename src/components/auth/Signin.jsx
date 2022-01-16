import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "../utils/Button";
import Input from "../utils/Input";

import {signin_start} from "../../redux/actions/auth.actions";

const Signin = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  function stateHandler(e) {
    setState((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  function signin(e) {
    e.preventDefault();
    signin_start(dispatch, state);
  }

  return (
    <div className="flex justify-center items-center w-full bg-gray-600 h-minus_header">
      <form
        className="bg-gray-300 flex flex-col space-y-5 p-8 rounded-sm w-96"
        onSubmit={signin}
      >
        <h3 className="text-lg">
          Signin to
          <span className="bg-white px-2 mx-2 rounded-sm">
            stack<span className="font-semibold text-blue-500">shop</span>
          </span>
          as a admin.
        </h3>
        {auth.error ? <p className="text-red-500">{auth.error}</p> : <></>}

        <Input onChange={stateHandler} id="email" type="email" />
        <Input onChange={stateHandler} id="password" type="password" />
        <Button type="submit" text="Sign in" loading={auth.loading} />
      </form>
    </div>
  );
};

export default Signin;
