import css from "./AppBar.module.css";
import { NavLink } from "react-router-dom";

export default function AppBar() {
  
  return (
    <header className={css.header}>
    <NavLink to="/"><img src="/fav.jpg" alt="logo" width='50' className={css.logo}/></NavLink>
    <NavLink className={css.link} to="/">Home</NavLink>
    <NavLink className={css.link} to="/users">Users</NavLink>
    <NavLink className={css.link} to="/bookings">Booking</NavLink>
    <NavLink to="/bookings">
    <p className={css.nameProject}>Booking System</p></NavLink>
  </header>
  );
}