import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/auth/authSelectors";
import {logout} from "../redux/auth/authOperations"
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

const handleLogout = () => {
  dispatch(logout())
}
  return (

    <nav>
      <NavLink to='/'>Home</NavLink>
    </nav>
  );
};

export default Navigation;
