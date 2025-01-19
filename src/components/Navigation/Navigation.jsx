import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { IoHome } from "react-icons/io5";

export default function Navigation() {
 
  return (
    <nav>
        <NavLink className={css.link} to="/">
            <IoHome />
        </NavLink>    
        <NavLink className={css.link} to="/users">
            Users
        </NavLink>
        <NavLink className={css.link} to="/bookings">
            Bookings
        </NavLink>
    </nav>
  );
}