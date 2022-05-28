import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllCountries, resetForm } from "../../redux/ducks/countries";
import { modeAddCountriesToActivity } from "../../redux/ducks/tourist_activity";
import style from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { initialForm } = useSelector((state) => state.countries);

  const handleHomeClick = () => {
    dispatch(modeAddCountriesToActivity());
    dispatch(resetForm(initialForm));
    dispatch(fetchAllCountries());
  };
  const handleActivitiesClick = () => {
    dispatch(resetForm(initialForm));
  };

  return (
    <nav className={style.navbar}>
      <h1 className={style.title}>
        <NavLink to="/" onClick={handleHomeClick} className={style.link}>
          Countries
        </NavLink>
      </h1>
      <ul className={style.list}>
        <li className={style.li}>
          <NavLink
            to="/actividades"
            onClick={handleActivitiesClick}
            className={style.link}
          >
            Actividades turisticas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
